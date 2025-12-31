package tech.hariprasath.authservice.dto;

import lombok.Builder;

@Builder
public record AuthResponse(String token, String message) {
}
