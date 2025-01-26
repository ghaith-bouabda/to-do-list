package com.ghaith.todolistbackend.auth;

import com.ghaith.todolistbackend.Token.Token;
import com.ghaith.todolistbackend.Token.TokenRepository;
import com.ghaith.todolistbackend.Token.TokenType;
import com.ghaith.todolistbackend.Users.Role;
import com.ghaith.todolistbackend.Users.Users;
import com.ghaith.todolistbackend.Users.UsersRepository;
import com.ghaith.todolistbackend.config.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

    SaveUserToken(savedUser, JwtToken);
    return AuthenticationResponse.builder().token(JwtToken).build();
    }
    private void RevokeUserToken(Users user) {
    var UserAllTokens = tokenRepository.findAllValidTokenByUser(user);
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

    SaveUserToken(user, JwtToken);
    return AuthenticationResponse.builder().token(JwtToken).build();
}


}
