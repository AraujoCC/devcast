package com.devcast.controller;

import com.devcast.dto.MessageRequest;
import com.devcast.dto.MessageResponse;
import com.devcast.entity.Message;
import com.devcast.entity.Room;
import com.devcast.entity.User;
import com.devcast.repository.MessageRepository;
import com.devcast.repository.RoomRepository;
import com.devcast.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.UUID;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final MessageRepository messageRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    // Cliente envia para: /app/chat/{roomId}
    // Servidor publica em: /topic/sala.{roomId}
    @MessageMapping("/chat/{roomId}")
    @SendTo("/topic/sala.{roomId}")
    public MessageResponse enviarMensagem(
            @DestinationVariable String roomId,
            MessageRequest request) {

        Room room = roomRepository.findById(UUID.fromString(roomId))
                .orElseThrow(() -> new RuntimeException("Sala não encontrada"));

        User sender = userRepository.findById(UUID.fromString(request.getSenderId()))
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Message message = Message.builder()
                .room(room)
                .sender(sender)
                .content(request.getContent())
                .type(Message.MessageType.TEXT)
                .build();

        messageRepository.save(message);

        return MessageResponse.builder()
                .id(message.getId().toString())
                .roomId(roomId)
                .senderUsername(sender.getUsername())
                .content(message.getContent())
                .sentAt(message.getSentAt())
                .build();
    }
}