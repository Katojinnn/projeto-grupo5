package grupo5.demo;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Categoria {

    @Id
    @GeneratedValue
    private Long id;
    private String nome;

    @OneToMany(mappedBy = "categoria", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Produto> produtos = new HashSet<>();

    public Categoria() {}

    public Categoria(String nome) {
        this.nome = nome;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Set<Produto> getProdutos() {
        return produtos;
    }

    public void setProdutos(Set<Produto> produtos) {
        this.produtos = produtos;
    }

    // Método auxiliar para adicionar produtos
    public void addProduto(Produto produto) {
        produtos.add(produto);
        produto.setCategoria(this);
    }

    public void removeProduto(Produto produto) {
        produtos.remove(produto);
        produto.setCategoria(null);
    }
}
