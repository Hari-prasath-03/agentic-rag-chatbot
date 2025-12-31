package tech.hariprasath.authservice.dto;

import jakarta.validation.constraints.NotNull;

public record AuthRequest(
        @NotNull(message = "Both user name and password are required") String email,
        @NotNull(message = "Both user name and password are required") String password) {
}
