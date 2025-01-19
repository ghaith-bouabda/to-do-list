package com.ghaith.todolistbackend.Task;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.ghaith.todolistbackend.Users.Users;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    private String title;

    private boolean completed;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    @JsonBackReference
    private Users user;
}