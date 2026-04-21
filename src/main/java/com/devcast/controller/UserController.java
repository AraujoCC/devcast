package com.devcast.controller;

import com.devcast.dto.LoginRequest;
import com.devcast.dto.UserRequest;
import com.devcast.dto.UserResponse;
import com.devcast.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    @PostMapping("/cadastrar")
    public ResponseEntity<UserResponse> cadastrar(@RequestBody UserRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.cadastrar(request));
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(userService.login(request));
    }

    @PostMapping("/{userId}/logout")
    public ResponseEntity<Void> logout(@PathVariable String userId) {
        userService.logout(userId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/online")
    public ResponseEntity<List<UserResponse>> online() {
        return ResponseEntity.ok(userService.listarOnline());
    }
}