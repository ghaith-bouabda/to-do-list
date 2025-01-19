package com.ghaith.todolistbackend.Users;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ghaith.todolistbackend.Task.Task;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToMany(mappedBy = "user",orphanRemoval = false,cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Task> tasks;
        @Column(nullable = false, unique = true)
        private String username;
        @Column(nullable = false ,unique = true)
        private String email;
        @Column(nullable = false)
        private String password;

}


