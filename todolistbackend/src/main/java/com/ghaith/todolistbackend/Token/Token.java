package com.ghaith.todolistbackend.Token;

import com.ghaith.todolistbackend.Users.Users;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Token {
    @ManyToOne
    @JoinColumn(name = "user_id")

    private Users user;
    @Id
    @GeneratedValue
    private Long id;
    private String token;
    @Enumerated(EnumType.STRING)
    private TokenType  tokenType;

    private boolean expired;
    private boolean revoked;

}