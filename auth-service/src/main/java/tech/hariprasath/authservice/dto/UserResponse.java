package tech.hariprasath.authservice.dto;

import lombok.Builder;

@Builder
public record UserResponse(String id, String name, String email, String createdAt, String updatedAt) {
}
