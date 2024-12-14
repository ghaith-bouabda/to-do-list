package com.ghaith.todolistbackend.Users;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
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
