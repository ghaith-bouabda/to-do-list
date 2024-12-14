package com.ghaith.todolistbackend.Users;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsersService {
    private final UsersRepository usersRepository;
    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }
    public Users createUser(Users users) {
        return usersRepository.save(users);
    }
}