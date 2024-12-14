package com.ghaith.todolistbackend.Users;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data 
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        @Column(nullable = false, unique = true)
        private String username;
        @Column(nullable = false)
        private String password;
}


