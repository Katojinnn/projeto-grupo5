package grupo5.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    @Autowired
    private PedidoRepo pedidoRepo;

    @GetMapping
    public Iterable<Pedido> listarPedidos() {
        return pedidoRepo.findAll();
    }

    @PostMapping
    public Pedido adicionarPedido(@RequestBody Pedido pedido) {
        return pedidoRepo.save(pedido);
    }

    @PutMapping("/{id}")
    public Pedido atualizarPedido(@PathVariable long id, @RequestBody Pedido pedidoAtualizado) {
        return pedidoRepo.findById(id)
                .map(pedido -> {
                    pedido.setCliente(pedidoAtualizado.getCliente());
                    pedido.setProduto(pedidoAtualizado.getProduto());
                    pedido.setQuantidade(pedidoAtualizado.getQuantidade());
                    pedido.setData(pedidoAtualizado.getData());
                    pedido.setStatus(pedidoAtualizado.getStatus());
                    return pedidoRepo.save(pedido);
                })
                .orElseGet(() -> {
                    pedidoAtualizado.setId(id);
                    return pedidoRepo.save(pedidoAtualizado);
                });
    }

    @DeleteMapping("/{id}")
    public void deletarPedido(@PathVariable long id) {
        pedidoRepo.deleteById(id);
    }
}

