package com.ghaith.todolistbackend.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

@PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register
        (@RequestBody RegisterRequest request )
        {
            return ResponseEntity.ok(authenticationService.register(request));
                     }




@PostMapping("/auth")
    public ResponseEntity<AuthenticationResponse> authentication
        (@RequestBody AuthenticationRequest request )
    {
        return ResponseEntity.ok(authenticationService.authenticate(request));
        }
}
