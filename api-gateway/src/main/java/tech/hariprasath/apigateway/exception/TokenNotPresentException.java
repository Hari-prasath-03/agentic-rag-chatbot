package tech.hariprasath.apigateway.exception;

public class TokenNotPresentException extends RuntimeException {
    public TokenNotPresentException(String tokenNotPresent) {
        super(tokenNotPresent);
    }
}
