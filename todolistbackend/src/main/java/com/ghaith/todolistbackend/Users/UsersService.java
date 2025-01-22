package com.ghaith.todolistbackend.Users;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsersService {
    private final UsersRepository usersRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }
    public Users createUser(String username, String email, String password) {
        String hashedPassword = passwordEncoder.encode(password); // Hash the password
        Users user = new Users();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(hashedPassword);
        return usersRepository.save(user);
    }
   public Users findUserByUsername(String username) {
        return usersRepository.findByUsername(username);
   }

    public boolean authenticateUser(String username, String password) {
        Users user = usersRepository.findByUsername(username); // Fetch user by username
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {  // Verify the password
            return true;
        } else {
            return false;
        }
    }
}
