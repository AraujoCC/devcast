package com.devcast.controller;

import com.devcast.dto.RoomRequest;
import com.devcast.dto.RoomResponse;
import com.devcast.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class RoomController {

    private final ChatService chatService;

    @PostMapping
    public ResponseEntity<RoomResponse> criar(@RequestBody RoomRequest request) {
        RoomResponse response = chatService.criarSala(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<RoomResponse>> listar() {
        return ResponseEntity.ok(chatService.listarSalasPublicas());
    }

    @PostMapping("/{roomId}/entrar")
    public ResponseEntity<Void> entrar(
            @PathVariable UUID roomId,
            @RequestParam UUID userId) {
        chatService.entrarNaSala(roomId, userId);
        return ResponseEntity.ok().build();
    }
}