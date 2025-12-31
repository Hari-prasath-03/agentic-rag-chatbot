package tech.hariprasath.authservice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import tech.hariprasath.authservice.dto.UserRequest;
import tech.hariprasath.authservice.dto.UserResponse;
import tech.hariprasath.authservice.resolver.annotation.UserId;
import tech.hariprasath.authservice.service.UserService;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> registerUser(@RequestBody @Validated UserRequest userRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.registerUser(userRequest));
    }

    @GetMapping("/my-profile")
    public ResponseEntity<UserResponse> getMyDetails(@UserId String email) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getUser(email));
    }
}
