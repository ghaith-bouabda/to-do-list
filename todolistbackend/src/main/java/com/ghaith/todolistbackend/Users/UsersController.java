package com.ghaith.todolistbackend.Users;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://172.18.0.1:8000")
@RequiredArgsConstructor
public class UsersController {
private final UsersService usersService;
    @PostMapping("/createuser")
    public Users createUser(@RequestBody Users user) {
       return usersService.createUser(user);
}
@GetMapping("/getusers")
   public List<Users> getAllUsers() {
    return usersService.getAllUsers();

}
@GetMapping("/getuser")
public Users getUserByUsername(@RequestParam("username") String username) {
        return usersService.findUserByUsername(username);
}
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UsersDto usersDTO) {
        boolean isAuthenticated = usersService.authenticateUser(usersDTO.username(), usersDTO.password());

        if (isAuthenticated) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

}
