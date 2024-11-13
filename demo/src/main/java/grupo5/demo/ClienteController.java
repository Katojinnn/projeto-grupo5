package grupo5.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    @Autowired
    private ClienteRepo clienteRepo;

    @GetMapping
    public Iterable<Cliente> listarClientes() {
        return clienteRepo.findAll();
    }

    @PostMapping
    public Cliente adicionarCliente(@RequestBody Cliente cliente) {
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
                    return clienteRepo.save(cliente);
                })
                .orElseGet(() -> {
                    clienteAtualizado.setId(id);
                    return clienteRepo.save(clienteAtualizado);
                });
    }

    @DeleteMapping("/{id}")
    public void deletarCliente(@PathVariable long id) {
        clienteRepo.deleteById(id);
    }
}
