package grupo5.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "https://poisonous-spooky-spirit-wr7xjgv9q54rhv47j-3000.app.github.dev/")
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepo usuarioRepo;

    @GetMapping
    public Iterable<Usuario> listarUsuarios() {
        return usuarioRepo.findAll();
    }

    @PostMapping
    public Usuario adicionarUsuario(@RequestBody Usuario usuario) {
        return usuarioRepo.save(usuario);
    }
}
