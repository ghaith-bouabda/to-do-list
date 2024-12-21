package com.ghaith.todolistbackend.Users;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<Users, Long> {
     Users findByUsernameAndPassword(String username, String password);
}
