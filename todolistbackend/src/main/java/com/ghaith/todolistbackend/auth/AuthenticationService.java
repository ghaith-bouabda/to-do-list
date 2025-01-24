package com.ghaith.todolistbackend.auth;

import com.ghaith.todolistbackend.Users.Role;
import com.ghaith.todolistbackend.Users.Users;
import com.ghaith.todolistbackend.Users.UsersRepository;
import com.ghaith.todolistbackend.config.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
private final UsersRepository usersRepository;
private final PasswordEncoder passwordEncoder;
private final JwtService jwtService;
private final AuthenticationManager authenticationManager;
public AuthenticationResponse  register(RegisterRequest RegisterRequest) {
        var user= Users.builder()
                .username(RegisterRequest.getUsername())
                .password(passwordEncoder.encode(RegisterRequest.getPassword()))
                .email(RegisterRequest.getEmail())
                .role(Role.USER)
                .build();

        usersRepository.save(user);
        var JwtToken= jwtService.generateToken(user);

        return AuthenticationResponse.builder().token(JwtToken).build();
    }
public AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest) {
  authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken
                  (
                  authenticationRequest.getUsername(),
                  authenticationRequest.getPassword()
                  ));
  var user = usersRepository.findByEmail(authenticationRequest.getUsername())
          .orElseThrow();
    var JwtToken= jwtService.generateToken(user);

    return AuthenticationResponse.builder().token(JwtToken).build();
}


}
