package grupo5.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoRepo produtoRepository;

    @Autowired
    private CategoriaRepo categoriaRepository;

    // Listar todos os produtos
    @GetMapping
    public List<Produto> listarProdutos() {
        return produtoRepository.findAll();
    }

    // Criar um novo produto
    @PostMapping
    public ResponseEntity<Produto> criarProduto(@RequestBody Produto produto) {
        // Verificar se a categoria existe
        if (produto.getCategoria() != null && produto.getCategoria().getId() != null) {
            categoriaRepository.findById(produto.getCategoria().getId())
                .ifPresent(produto::setCategoria);
        }
        Produto novoProduto = produtoRepository.save(produto);
        return new ResponseEntity<>(novoProduto, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> atualizarProduto(@PathVariable Long id, @RequestBody Produto produtoAtualizado) {
        return produtoRepository.findById(id)
            .map(produto -> {
                produto.setNome(produtoAtualizado.getNome());
                produto.setDescricao(produtoAtualizado.getDescricao());
                produto.setPreco(produtoAtualizado.getPreco());
                produto.setQuantidadeEmEstoque(produtoAtualizado.getQuantidadeEmEstoque());

                // Atualizar a categoria, se fornecida
                if (produtoAtualizado.getCategoria() != null) {
                    produto.setCategoria(produtoAtualizado.getCategoria());
                }

                Produto produtoSalvo = produtoRepository.save(produto);
                return ResponseEntity.ok(produtoSalvo);
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarProduto(@PathVariable Long id) {
        return produtoRepository.findById(id)
            .map(produto -> {
                produtoRepository.delete(produto);
                return ResponseEntity.noContent().<Void>build();
            })
            .orElse(ResponseEntity.notFound().build());
    }
    
}
