package grupo5.demo.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Permite todas as rotas
                .allowedOrigins("https://poisonous-spooky-spirit-wr7xjgv9q54rhv47j-3000.app.github.dev")  // Permite apenas esse domínio como origem
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Permite esses métodos HTTP
                .allowedHeaders("*")  // Permite todos os cabeçalhos
                .allowCredentials(true);  // Permite enviar cookies com a requisição
    }
}