package grupo5.demo.produto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin(origins = "https://cautious-pancake-wr7xjgv9qj9p39q69-3000.app.github.dev/")
public class ProdutoController {

    @Autowired
    private ProdutoRepo produtoRepo;

    @GetMapping
    public Iterable<Produto> listarProdutos() {
        return produtoRepo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> buscarProdutoPorId(@PathVariable long id) {
        return produtoRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Produto adicionarProduto(@RequestBody Produto produto) {
        return produtoRepo.save(produto);
    }

    @PutMapping("/{id}")
    public Produto atualizarProduto(@PathVariable long id, @RequestBody Produto produtoAtualizado) {
        return produtoRepo.findById(id)
                .map(produto -> {
                    produto.setNome(produtoAtualizado.getNome());
                    produto.setDescricao(produtoAtualizado.getDescricao());
                    produto.setPreco(produtoAtualizado.getPreco());
                    produto.setEstoque(produtoAtualizado.getEstoque());
                    return produtoRepo.save(produto);
                })
                .orElseGet(() -> {
                    produtoAtualizado.setId(id);
                    return produtoRepo.save(produtoAtualizado);
                });
    }

    @DeleteMapping("/{id}")
    public void deletarProduto(@PathVariable long id) {
        produtoRepo.deleteById(id);
    }
}
