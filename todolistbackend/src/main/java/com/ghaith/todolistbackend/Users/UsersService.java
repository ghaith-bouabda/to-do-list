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
   public Users findUserByUsername(String username) {
        return usersRepository.findByUsername(username);
   }

    public boolean authenticateUser(String username, String password) {
if (usersRepository.findByUsernameAndPassword(username, password)!=null) {
    return true;
}else
    return false;

    }
}
