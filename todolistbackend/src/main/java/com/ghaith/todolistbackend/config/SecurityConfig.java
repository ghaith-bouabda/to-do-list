package com.ghaith.todolistbackend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable() // Disable CSRF if you're not using it (optional)
                .cors().and()  // Enable CORS
                .authorizeRequests()
                .anyRequest().permitAll()
                .and()
                .logout(logout -> logout
                        .logoutUrl("/logout") // The endpoint to trigger logout
                        .invalidateHttpSession(true) // Invalidate session
                        .clearAuthentication(true) // Clear authentication
                        .deleteCookies("JSESSIONID") // Remove session cookies
                        .logoutSuccessHandler((request, response, authentication) -> {
                            response.setStatus(200); // Return HTTP 200 OK
                            response.getWriter().write("Logout successful"); // Custom response
                        })
                );

        return http.build();  // Return the SecurityFilterChain bean
    }
}
