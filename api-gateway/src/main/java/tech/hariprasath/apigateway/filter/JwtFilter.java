package tech.hariprasath.apigateway.filter;

import lombok.RequiredArgsConstructor;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;
import tech.hariprasath.apigateway.exception.TokenNotPresentException;
import tech.hariprasath.apigateway.service.JwtService;

import java.util.Objects;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class JwtFilter implements GatewayFilter {
    private final JwtService jwtService;

    private static final Set<String> PUBLIC_PATHS = Set.of(
            "/user/login",
            "/user/register"
    );

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {

        final String path = exchange.getRequest().getPath().value();

        if (PUBLIC_PATHS.contains(path)) {
            return chain.filter(exchange);
        }

        final String token = extractToken(exchange.getRequest());

        if(!jwtService.isTokenValid(token)){
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        final String email = jwtService.extractSubject(token);

        ServerHttpRequest modifiedRequest = exchange.getRequest()
                .mutate()
                .header("X-user-email", email)
                .build();

        return chain.filter(exchange.mutate().request(modifiedRequest).build());
    }

    private String extractToken(ServerHttpRequest request) {
        if (request.getCookies().containsKey("token")) {
            String tokenFromCookie = Objects.requireNonNull(request.getCookies().getFirst("token")).getValue();
            if (!tokenFromCookie.isBlank()) {
                return tokenFromCookie;
            }
        }

        String authHeader = request.getHeaders().getFirst("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }

        throw  new TokenNotPresentException("Token not present");
    }
}
