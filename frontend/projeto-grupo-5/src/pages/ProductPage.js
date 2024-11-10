import React, { useEffect, useState } from 'react';
import { fetchProdutos, deleteProduto } from '../services/api'; // Funções para buscar e deletar produtos
import './ProductPage.css';

const ProductPage = () => {
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [alerta, setAlerta] = useState("");
  
  // Estado para verificar se o usuário é admin
  const [isAdmin, setIsAdmin] = useState(true); // Defina manualmente como true ou false, ou integre com sua autenticação

  // Carregar produtos ao montar o componente
  useEffect(() => {
    const loadProdutos = async () => {
      try {
        const produtosData = await fetchProdutos();
        setProdutos(Array.isArray(produtosData) ? produtosData : []);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        setProdutos([]);
      }
    };
    loadProdutos();
  }, []);

  // Função para adicionar produto ao carrinho
  const adicionarAoCarrinho = (produto) => {
    setCarrinho((prevCarrinho) => [...prevCarrinho, produto]);
    setSubtotal((prevSubtotal) => prevSubtotal + produto.preco);

    // Exibe o alerta de confirmação temporário
    setAlerta(`Produto "${produto.nome}" adicionado ao carrinho!`);
    setTimeout(() => setAlerta(""), 2000);  // Limpa o alerta após 2 segundos
  };

  // Função para excluir produto
  const excluirProduto = async (produtoId) => {
    try {
      await deleteProduto(produtoId);
      // Atualiza a lista de produtos após a exclusão
      setProdutos((prevProdutos) => prevProdutos.filter((produto) => produto.id !== produtoId));
      setAlerta("Produto excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir o produto:", error);
      setAlerta("Erro ao excluir o produto.");
    }
  };

  return (
    <div className="product-page">
      <h1 className="title">Produtos Disponíveis</h1>

      {alerta && <div className="alerta">{alerta}</div>}

      <div className="products-container">
        {produtos && produtos.length > 0 ? (
          produtos.map((produto) => (
            <div className="product-card" key={produto.id}>
              <h2 className="product-name">{produto.nome}</h2>
              <p className="product-description">{produto.descricao}</p>
              <p className="product-price">Preço: R$ {produto.preco.toFixed(2)}</p>
              <button className="add-to-cart-btn" onClick={() => adicionarAoCarrinho(produto)}>
                Adicionar ao Carrinho
              </button>
              
              {/* Exibe o botão de excluir apenas se for um administrador */}
              {isAdmin && (
                <button className="delete-btn" onClick={() => excluirProduto(produto.id)}>
                  Deletar Produto
                </button>
              )}
            </div>
          ))
        ) : (
          <p>Não há produtos disponíveis.</p>
        )}
      </div>

      <div className="cart-section">
        <h2 className="cart-title">Carrinho</h2>
        {carrinho.length > 0 ? (
          <div>
            {carrinho.map((item, index) => (
              <p className="cart-item" key={index}>
                {item.nome} - R$ {item.preco.toFixed(2)}
              </p>
            ))}
            <hr />
            <p className="cart-subtotal">Subtotal: R$ {subtotal.toFixed(2)}</p>
          </div>
        ) : (
          <p className="cart-empty">O carrinho está vazio.</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
