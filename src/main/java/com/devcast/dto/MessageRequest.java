package com.devcast.dto;

import lombok.Data;

@Data
public class MessageRequest {
    private String roomId;
    private String senderId;
    private String content;
}