package com.ghaith.todolistbackend.config;

import com.ghaith.todolistbackend.Token.TokenRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
@RequiredArgsConstructor
@Component
public class JwtAuthentificationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService UserDetailsService;
    private final TokenRepository   tokenRepository;

    @Override
    protected void doFilterInternal(
                                  @NonNull HttpServletRequest request,
                                  @NonNull HttpServletResponse response,
                                  @NonNull  FilterChain filterChain
                                    )
            throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String Useremail;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request,response);
            return;
        }
        jwt = authHeader.substring(7);
        Useremail= jwtService.extractUsername(jwt);
        if(Useremail !=null && SecurityContextHolder.getContext().getAuthentication()==null){
            UserDetails userDetails = this.UserDetailsService.loadUserByUsername(Useremail);
            var isTokenValid= tokenRepository.findByToken(jwt)
                    .map(token -> !token.isExpired() && !token.isRevoked())
                    .orElse(false);
            if (jwtService.isTokenValid(jwt,userDetails) && isTokenValid) {
                UsernamePasswordAuthenticationToken authenticationToken= new UsernamePasswordAuthenticationToken
                        (userDetails,
                        null,
                        userDetails.getAuthorities());
                    authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);

            }
        }
        filterChain.doFilter(request,response);
    }
}
