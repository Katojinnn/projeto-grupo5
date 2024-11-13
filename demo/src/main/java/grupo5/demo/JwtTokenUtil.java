package grupo5.demo;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Date;

@Component
public class JwtTokenUtil {

    private String secretKey = "mySecretKey";  // Altere para uma chave secreta mais segura

    public String generateToken(UserDetails userDetails) {
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))  // Expiração de 1 hora
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }
}
