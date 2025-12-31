package tech.hariprasath.authservice.service;

import tech.hariprasath.authservice.dto.UserRequest;
import tech.hariprasath.authservice.dto.UserResponse;

public interface UserService {

    UserResponse registerUser(UserRequest user);

    UserResponse getUser(String email);
}
