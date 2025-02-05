package com.ghaith.todolistbackend.Users;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UsersService {
public final UsersRepository usersRepository;
public Optional<Users> getuser(String username){
    return usersRepository.findByUsername(username);
}
}

