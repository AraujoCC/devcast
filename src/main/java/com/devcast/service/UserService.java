package com.devcast.service;

import com.devcast.dto.LoginRequest;
import com.devcast.dto.UserRequest;
import com.devcast.dto.UserResponse;
import com.devcast.entity.User;
import com.devcast.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public UserResponse cadastrar(UserRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email já cadastrado");
        }
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username já em uso");
        }

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .passwordHash("hash_" + request.getPassword())
                .isOnline(false)
                .build();

        userRepository.save(user);
        return toResponse(user);
    }

    @Transactional
    public UserResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Email ou senha inválidos"));

        if (!user.getPasswordHash().equals("hash_" + request.getPassword())) {
            throw new RuntimeException("Email ou senha inválidos");
        }

        user.setIsOnline(true);
        user.setLastSeen(java.time.OffsetDateTime.now());
        userRepository.save(user);

        return toResponse(user);
    }

    @Transactional
    public void logout(String userId) {
        User user = userRepository.findById(java.util.UUID.fromString(userId))
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        user.setIsOnline(false);
        user.setLastSeen(java.time.OffsetDateTime.now());
        userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public List<UserResponse> listarOnline() {
        return userRepository.findAll()
                .stream()
                .filter(u -> Boolean.TRUE.equals(u.getIsOnline()))
                .map(this::toResponse)
                .toList();
    }

    private UserResponse toResponse(User user) {
        return UserResponse.builder()
                .id(user.getId().toString())
                .username(user.getUsername())
                .email(user.getEmail())
                .isOnline(user.getIsOnline())
                .createdAt(user.getCreatedAt())
                .build();
    }
}