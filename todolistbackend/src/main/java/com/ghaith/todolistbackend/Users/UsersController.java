package com.ghaith.todolistbackend.Users;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UsersController {
    private final UsersService usersService;


@GetMapping("/getuser")
    public Optional<Users> getuser(String Username) {
        return usersService.getuser(Username);
    }


}

