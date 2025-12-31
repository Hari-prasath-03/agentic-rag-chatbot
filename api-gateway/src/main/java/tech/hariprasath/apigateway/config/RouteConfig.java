package tech.hariprasath.apigateway.config;

import lombok.RequiredArgsConstructor;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import tech.hariprasath.apigateway.filter.JwtFilter;

@Configuration
@RequiredArgsConstructor
public class RouteConfig {
    private final JwtFilter jwtFilter;

    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("auth-service", r -> r.path("/user/**")
                        .filters(f -> f.filters(jwtFilter))
                        .uri("http://auth-service:8080")
                )
                .route("webbot-service", r -> r.path("/ai-assist/**")
                        .filters(f -> f.filters(jwtFilter))
                        .uri("http://webbot-service:8081"))
                .build();
    }
}
