package com.ghaith.todolistbackend.auth;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication")
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

    @PostMapping("/refresh")
    public void refresh (
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        authenticationService.refreshToken(request,response);
}
}
