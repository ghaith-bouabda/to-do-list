package com.ghaith.todolistbackend.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ghaith.todolistbackend.Token.Token;
import com.ghaith.todolistbackend.Token.TokenRepository;
import com.ghaith.todolistbackend.Token.TokenType;
import com.ghaith.todolistbackend.Users.Role;
import com.ghaith.todolistbackend.Users.Users;
import com.ghaith.todolistbackend.Users.UsersRepository;
import com.ghaith.todolistbackend.config.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;

import javax.swing.*;
import java.io.IOException;
import java.io.OutputStream;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
private final UsersRepository usersRepository;
private final PasswordEncoder passwordEncoder;
private final JwtService jwtService;
private final AuthenticationManager authenticationManager;
private final TokenRepository tokenRepository;



    //REGISTRATION
public AuthenticationResponse  register(RegisterRequest RegisterRequest) {
        var user= Users.builder()
                .username(RegisterRequest.getUsername())
                .password(passwordEncoder.encode(RegisterRequest.getPassword()))
                .email(RegisterRequest.getEmail())
                .role(Role.USER)
                .build();

        var savedUser=usersRepository.save(user);
    var JwtToken= jwtService.generateToken(user);
    var RefreshToken= jwtService.generateRefreshToken(user);

    SaveUserToken(savedUser, JwtToken);
    return AuthenticationResponse
            .builder()
            .accessToken(JwtToken)
            .refreshToken(RefreshToken)
            .build();
    }
    private void RevokeUserToken(Users user) {
    var UserAllTokens = tokenRepository.findAllValidTokenByUser(user.getId());
    if (UserAllTokens.isEmpty()) {
        return;
    }
    UserAllTokens.forEach(token -> {
        token.setExpired(true);
        token.setRevoked(true);
    });
    tokenRepository.saveAll(UserAllTokens);
    }

//SAVING THE USER'S TOKEN METHOD
    private void SaveUserToken(Users User, String JwtToken) {
        var token= Token.builder()
                    .user(User)
                    .token(JwtToken)
                    .expired(false)
                    .revoked(false)
                    .tokenType(TokenType.BEARER)
                    .build();
        tokenRepository.save(token);
    }
//AUTHENTICATION
    public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest) {
  authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken
                  (
                  authenticationRequest.getUsername(),
                  authenticationRequest.getPassword()
                  ));
  var user = usersRepository.findByUsername(authenticationRequest.getUsername())
          .orElseThrow();
    var JwtToken= jwtService.generateToken(user);
        var RefreshToken= jwtService.generateRefreshToken(user);
        RevokeUserToken(user);
    SaveUserToken(user, JwtToken);
    return AuthenticationResponse
            .builder()
            .accessToken(JwtToken)
            .refreshToken(RefreshToken)
            .build();
}

//REFRESH TOKEN
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refresh;
        final String Username;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }
        refresh = authHeader.substring(7);
        Username= jwtService.extractUsername(refresh);
        if(Username !=null ){
            var user= this.usersRepository.findByUsername(Username).orElseThrow();

            if (jwtService.isTokenValid(refresh,user) ) {
              var accessToken= jwtService.generateToken(user);
                RevokeUserToken(user);
                SaveUserToken(user, accessToken);
              var authResponse = AuthenticationResponse
                      .builder()
                      .accessToken(accessToken)
                      .refreshToken(refresh)
                      .build();
              new ObjectMapper().writeValue(response.getOutputStream(),authResponse);
            }
        }
    }
}

