package tech.hariprasath.authservice.service;

import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NullMarked;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import tech.hariprasath.authservice.entity.UserEntity;
import tech.hariprasath.authservice.repository.UserRepository;

import java.util.List;

@Component
@RequiredArgsConstructor
public class AppUserDetailService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override @NullMarked
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByEmail(email).
                orElseThrow(()  -> new UsernameNotFoundException("User with email: " + email + " not found"));
        return new User(user.getEmail(), user.getPassword(), List.of(new SimpleGrantedAuthority("ROLE_USER")));
    }
}
