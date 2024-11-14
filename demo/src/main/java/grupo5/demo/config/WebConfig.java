package grupo5.demo.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // All API paths
                .allowedOrigins("https://cautious-pancake-wr7xjgv9qj9p39q69-3000.app.github.dev") // Frontend URL
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allowed methods
                .allowedHeaders("Authorization", "Content-Type") // Allowed headers
                .allowCredentials(true); // Allow credentials (cookies, headers, etc.)
    }
}