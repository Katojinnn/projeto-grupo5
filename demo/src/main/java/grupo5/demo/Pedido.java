package grupo5.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.util.List;
import java.util.Date;

@Entity
public class Pedido {

    @Id
    @GeneratedValue
    private long id;
    private double total;
    private String status;
    private int quantidade;
    private Date data;

    @ManyToOne
    private Cliente cliente;

    @OneToMany
    private List<ItemPedido> itens;

    @ManyToOne
    private Produto produto;

    public Pedido() {}
    
    public long getId() {return id;}
    public void setId(long id) {this.id = id;}
    public double getTotal() {return total;}
    public void setTotal(double total) {this.total = total;}
    public String getStatus() {return status;}
    public void setStatus(String status) {this.status = status;}
    public int getQuantidade() { return quantidade;}
    public void setQuantidade(int quantidade) {this.quantidade = quantidade;}
    public Date getData() {return data;}
    public void setData(Date data) {this.data = data;}
    public Cliente getCliente() {return cliente;}
    public void setCliente(Cliente cliente) {this.cliente = cliente;}
    public List<ItemPedido> getItens() {return itens;}
    public void setItens(List<ItemPedido> itens) {this.itens = itens;}
    public Produto getProduto() {return produto;}
    public void setProduto(Produto produto) {this.produto = produto;}
}
