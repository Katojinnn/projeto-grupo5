package grupo5.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.authentication.BadCredentialsException;

@RestController
@RequestMapping("/api/login")
public class LoginController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private AdministradorService administradorService;

    @PostMapping
    public String login(@RequestBody LoginRequest loginRequest) {
        try {
            // Autentica o administrador
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getSenha())
            );

            // Cria o token JWT após a autenticação
            UserDetails userDetails = administradorService.loadUserByUsername(loginRequest.getEmail());
            String jwt = jwtTokenUtil.generateToken(userDetails);

            return "Bearer " + jwt;  // Retorna o token JWT
        } catch (BadCredentialsException e) {
            return "Credenciais inválidas";
        }
    }
}
