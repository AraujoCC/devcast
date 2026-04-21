package com.devcast.dto;

import lombok.Data;

@Data
public class RoomRequest {
    private String name;
    private String description;
    private boolean isPrivate;
    private String createdBy; // userId
}