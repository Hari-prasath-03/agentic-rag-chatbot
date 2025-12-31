package tech.hariprasath.apigateway.advice;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import tech.hariprasath.apigateway.exception.TokenNotPresentException;

import java.security.SignatureException;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(TokenNotPresentException.class)
    public ProblemDetail handleException(TokenNotPresentException ex) {
        ProblemDetail errorResponse = ProblemDetail.forStatus(HttpStatus.UNAUTHORIZED);
        errorResponse.setProperty("success", false);
        errorResponse.setProperty("message", ex.getMessage());
        return errorResponse;
    }

    @ExceptionHandler(ExpiredJwtException.class)
    public ProblemDetail handleException(ExpiredJwtException ex) {
        ProblemDetail errorResponse = ProblemDetail.forStatus(HttpStatus.UNAUTHORIZED);
        errorResponse.setProperty("success", false);
        errorResponse.setProperty("message", "Your token has expired");
        return errorResponse;
    }

    @ExceptionHandler(SignatureException.class)
    public ProblemDetail handleException(SignatureException ex) {
        ProblemDetail errorResponse = ProblemDetail.forStatus(HttpStatus.UNAUTHORIZED);
        errorResponse.setProperty("success", false);
        errorResponse.setProperty("message", ex.getMessage());
        return errorResponse;
    }

    @ExceptionHandler(MalformedJwtException.class)
    public ProblemDetail handleException(MalformedJwtException ex) {
        ProblemDetail errorResponse = ProblemDetail.forStatus(HttpStatus.UNAUTHORIZED);
        errorResponse.setProperty("success", false);
        errorResponse.setProperty("message", ex.getMessage());
        return errorResponse;
    }

    @ExceptionHandler(Exception.class)
    public ProblemDetail handleException(Exception ex) {
        log.error(ex.getMessage(), ex);
        ProblemDetail errorResponse = ProblemDetail.forStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        errorResponse.setProperty("success", false);
        errorResponse.setProperty("message", ex.getMessage());
        return errorResponse;
    }
}
