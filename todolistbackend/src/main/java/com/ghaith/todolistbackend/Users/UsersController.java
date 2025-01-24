package com.ghaith.todolistbackend.Users;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://172.18.0.1:8000")
@RequiredArgsConstructor
public class UsersController {
    private final UsersService usersService;




}

