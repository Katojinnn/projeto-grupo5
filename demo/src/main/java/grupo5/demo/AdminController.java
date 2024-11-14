package grupo5.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/administradores")
@CrossOrigin(origins = "https://cautious-pancake-wr7xjgv9qj9p39q69-3000.app.github.dev/")
public class AdminController {

    @Autowired
    private AdminController adminController;

    @GetMapping
    public Iterable<Admin> listarAdmin() {
        return adminRepo.findAll();
    }

    @PostMapping
    public Admin adicionarAdmin(@RequestBody Admin admin) {
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
                    return adminRepo.save(admin);
                })
                .orElseGet(() -> {
                    adminAtualizado.setId(id);
                    return adminRepo.save(adminAtualizado);
                });
    }

    @DeleteMapping("/{id}")
    public void deletarAdmin(@PathVariable long id) {
        adminRepo.deleteById(id);
    }
}

