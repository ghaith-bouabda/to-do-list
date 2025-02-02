package com.ghaith.todolistbackend.Users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface UsersRepository extends JpaRepository<Users, Long> {


    Optional<Users>  findByUsername(String username);


}
