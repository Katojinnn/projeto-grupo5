package grupo5.demo.auth;

import grupo5.demo.admin.Admin;
import grupo5.demo.admin.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "https://cautious-pancake-wr7xjgv9qj9p39q69-3000.app.github.dev/")
@RequestMapping("/auth")
public class AuthController {

    private final AdminRepo adminRepo;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthController(AdminRepo adminRepo, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.adminRepo = adminRepo;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        var adminOptional = adminRepo.findByEmail(loginRequest.getEmail());
    
        if (adminOptional.isPresent()) {
            Admin admin = adminOptional.get();
            // Valida a senha
            if (passwordEncoder.matches(loginRequest.getSenha(), admin.getSenha())) {
                String token = jwtUtil.gerarToken(admin.getEmail());
                return ResponseEntity.ok(new LoginResponse(token));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas!");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas!");
        }
    }
}
