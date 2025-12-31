package tech.hariprasath.authservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tech.hariprasath.authservice.dto.UserRequest;
import tech.hariprasath.authservice.dto.UserResponse;
import tech.hariprasath.authservice.entity.UserEntity;
import tech.hariprasath.authservice.exception.UserAlreadyExist;
import tech.hariprasath.authservice.mapper.UserMapper;
import tech.hariprasath.authservice.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserResponse registerUser(UserRequest userRequest) {
        if (userRepository.existsByEmail(userRequest.email())) {
            throw new UserAlreadyExist("Email Already Exists");
        }

        UserEntity newUser = UserEntity.builder()
                .name(userRequest.name())
                .email(userRequest.email())
                .password(passwordEncoder.encode(userRequest.password()))
                .build();
        return UserMapper.toUserResponse(userRepository.save(newUser));
    }

    @Override
    public UserResponse getUser(String email) {
        return UserMapper.toUserResponse(
                userRepository.findByEmail(email)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email))
        );
    }
}
