package com.ghaith.todolistbackend.Users;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://172.19.0.1:8000")
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

}
