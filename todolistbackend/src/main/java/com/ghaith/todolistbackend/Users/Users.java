package com.ghaith.todolistbackend.Users;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ghaith.todolistbackend.Task.Task;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
@Data
@Entity
@Table(name = "users")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Users implements UserDetails {

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
        @Enumerated(EnumType.STRING)
        private Role role;



    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}


