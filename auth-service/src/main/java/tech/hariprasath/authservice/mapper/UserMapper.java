package tech.hariprasath.authservice.mapper;

import lombok.RequiredArgsConstructor;
import tech.hariprasath.authservice.dto.UserResponse;
import tech.hariprasath.authservice.entity.UserEntity;

@RequiredArgsConstructor
public class UserMapper {

    public static UserResponse toUserResponse(UserEntity userEntity) {
        return UserResponse.builder()
                .id(userEntity.getId().toString())
                .name(userEntity.getName())
                .email(userEntity.getEmail())
                .createdAt(userEntity.getCreatedAt().toString())
                .updatedAt(userEntity.getUpdatedAt().toString())
                .build();
    }
}
