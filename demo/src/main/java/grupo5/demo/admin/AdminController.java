package grupo5.demo.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/administradores")
@CrossOrigin(origins = "https://cautious-pancake-wr7xjgv9qj9p39q69-3000.app.github.dev/")
public class AdminController {

    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private PasswordEncoder passwordEncoder; // Injeção do PasswordEncoder

    @GetMapping
    public Iterable<Admin> listarAdmin() {
        return adminRepo.findAll();
    }

    @PostMapping
    public Admin adicionarAdmin(@RequestBody Admin admin) {
        // Criptografa a senha antes de salvar
        admin.setSenha(passwordEncoder.encode(admin.getSenha()));
        return adminRepo.save(admin);
    }

    @PutMapping("/{id}")
    public Admin atualizarAdmin(@PathVariable long id, @RequestBody Admin adminAtualizado) {
        return adminRepo.findById(id)
                .map(admin -> {
                    admin.setNome(adminAtualizado.getNome());
                    admin.setEmail(adminAtualizado.getEmail());
                    admin.setTelefone(adminAtualizado.getTelefone());
                    admin.setEndereco(adminAtualizado.getEndereco());

                    // Atualiza a senha, caso tenha sido modificada
                    if (adminAtualizado.getSenha() != null && !adminAtualizado.getSenha().isEmpty()) {
                        admin.setSenha(passwordEncoder.encode(adminAtualizado.getSenha()));
                    }

                    return adminRepo.save(admin);
                })
                .orElseGet(() -> {
                    adminAtualizado.setId(id);
                    adminAtualizado.setSenha(passwordEncoder.encode(adminAtualizado.getSenha())); // Criptografa nova senha
                    return adminRepo.save(adminAtualizado);
                });
    }

    @DeleteMapping("/{id}")
    public void deletarAdmin(@PathVariable long id) {
        adminRepo.deleteById(id);
    }
}
