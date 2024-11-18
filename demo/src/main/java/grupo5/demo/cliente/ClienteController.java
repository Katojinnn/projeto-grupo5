package grupo5.demo.cliente;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "https://cautious-pancake-wr7xjgv9qj9p39q69-3000.app.github.dev/")
public class ClienteController {

    @Autowired
    private ClienteRepo clienteRepo;

    @Autowired
    private PasswordEncoder passwordEncoder; // Injeção do PasswordEncoder

    @GetMapping
    public Iterable<Cliente> listarClientes() {
        return clienteRepo.findAll();
    }

    @PostMapping
    public Cliente adicionarCliente(@RequestBody Cliente cliente) {
        // Criptografa a senha antes de salvar
        cliente.setSenha(passwordEncoder.encode(cliente.getSenha()));
        return clienteRepo.save(cliente);
    }

    @PutMapping("/{id}")
    public Cliente atualizarCliente(@PathVariable long id, @RequestBody Cliente clienteAtualizado) {
        return clienteRepo.findById(id)
                .map(cliente -> {
                    cliente.setNome(clienteAtualizado.getNome());
                    cliente.setEmail(clienteAtualizado.getEmail());
                    cliente.setTelefone(clienteAtualizado.getTelefone());
                    cliente.setEndereco(clienteAtualizado.getEndereco());

                    // Atualiza a senha, caso tenha sido modificada
                    if (clienteAtualizado.getSenha() != null && !clienteAtualizado.getSenha().isEmpty()) {
                        cliente.setSenha(passwordEncoder.encode(clienteAtualizado.getSenha()));
                    }

                    return clienteRepo.save(cliente);
                })
                .orElseGet(() -> {
                    clienteAtualizado.setId(id);
                    clienteAtualizado.setSenha(passwordEncoder.encode(clienteAtualizado.getSenha())); // Criptografa nova senha
                    return clienteRepo.save(clienteAtualizado);
                });
    }

    @DeleteMapping("/{id}")
    public void deletarCliente(@PathVariable long id) {
        clienteRepo.deleteById(id);
    }
}
