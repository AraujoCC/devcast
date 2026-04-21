package com.devcast.service;

import com.devcast.dto.RoomRequest;
import com.devcast.dto.RoomResponse;
import com.devcast.entity.Room;
import com.devcast.entity.RoomMember;
import com.devcast.entity.User;
import com.devcast.repository.RoomMemberRepository;
import com.devcast.repository.RoomRepository;
import com.devcast.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    private final RoomMemberRepository roomMemberRepository;

    @Transactional
    public RoomResponse criarSala(RoomRequest request) {
        if (roomRepository.existsByName(request.getName())) {
            throw new RuntimeException("Já existe uma sala com esse nome");
        }

        User criador = userRepository.findById(UUID.fromString(request.getCreatedBy()))
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Room room = Room.builder()
                .name(request.getName())
                .description(request.getDescription())
                .isPrivate(request.isPrivate())
                .createdBy(criador)
                .build();

        roomRepository.save(room);

        // criador entra automaticamente como ADMIN
        RoomMember member = RoomMember.builder()
                .room(room)
                .user(criador)
                .role(RoomMember.RoomRole.ADMIN)
                .build();

        roomMemberRepository.save(member);

        return toResponse(room);
    }

    @Transactional(readOnly = true)
    public List<RoomResponse> listarSalasPublicas() {
        return roomRepository.findByIsPrivateFalse()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public void entrarNaSala(UUID roomId, UUID userId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Sala não encontrada"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (roomMemberRepository.existsByRoomIdAndUserId(roomId, userId)) {
            return; // já é membro, não faz nada
        }

        RoomMember member = RoomMember.builder()
                .room(room)
                .user(user)
                .role(RoomMember.RoomRole.MEMBER)
                .build();

        roomMemberRepository.save(member);
    }

    private RoomResponse toResponse(Room room) {
        return RoomResponse.builder()
                .id(room.getId().toString())
                .name(room.getName())
                .description(room.getDescription())
                .isPrivate(room.getIsPrivate())
                .createdBy(room.getCreatedBy() != null ? room.getCreatedBy().getUsername() : null)
                .build();
    }
}