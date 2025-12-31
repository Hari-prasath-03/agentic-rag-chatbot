package tech.hariprasath.authservice.service;

import org.springframework.security.core.userdetails.UserDetails;

public interface JwtService {

    String generateToken(String subject);

    String extractSubject(String token);

    Boolean isTokenValid(String token, UserDetails userDetails, String subject);
}
