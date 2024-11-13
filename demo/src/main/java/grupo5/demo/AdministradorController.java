package grupo5.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "https://poisonous-spooky-spirit-wr7xjgv9q54rhv47j-3000.app.github.dev/")
@RequestMapping("/api/administradores")
public class AdministradorController {

    @Autowired
    private AdministradorRepo administradorRepo;

    @GetMapping
    public Iterable<Administrador> listarAdministradores() {
        return administradorRepo.findAll();
    }

    @PostMapping
    public Administrador adicionarAdministrador(@RequestBody Administrador administrador) {
        return administradorRepo.save(administrador);
    }
}
