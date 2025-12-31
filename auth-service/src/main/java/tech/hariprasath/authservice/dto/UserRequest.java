package tech.hariprasath.authservice.dto;

import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

public record UserRequest(
        @NotNull(message = "Please mention your sweet name") String name,
        @NotNull(message = "Email is required") String email,
        @Length(min=6, message = "Password must contains at-least 6 characters") String password
) {
}
