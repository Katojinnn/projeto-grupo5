package grupo5.demo;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "https://poisonous-spooky-spirit-wr7xjgv9q54rhv47j-3000.app.github.dev/")
@RequestMapping("/api/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoRepo produtoRepo;

    @GetMapping
    public Iterable<Produto> listarProdutos() {
        return produtoRepo.findAll();
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

