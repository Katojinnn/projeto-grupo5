import React, { useState, useEffect } from 'react';
import { API_URL } from '../services/Api';
import '../styles/Admin.css';

function Admin() {
  const [produtos, setProdutos] = useState([]);
  const [novoProduto, setNovoProduto] = useState({ nome: '', descricao: '', preco: '', estoque: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/produtos`)
      .then(response => response.json())
      .then(data => {
        console.log("Produtos carregados:", data);
        // Verifique se data é um array antes de definir os produtos
        if (Array.isArray(data)) {
          setProdutos(data);
        } else {
          console.error("Resposta inválida, esperado um array", data);
          setProdutos([]); // Defina um array vazio em caso de resposta inesperada
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao carregar produtos:", error);
        setLoading(false);
      });
  }, []);

  const handleCriarProduto = () => {
    fetch(`${API_URL}/produtos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novoProduto),
    })
      .then(response => response.json())
      .then(data => {
        setProdutos([...produtos, data]);
        setNovoProduto({ nome: '', descricao: '', preco: '', estoque: '' });
      })
      .catch(error => console.error("Erro ao criar produto:", error));
  };

  const handleDeletarProduto = (id) => {
    fetch(`${API_URL}/produtos/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setProdutos(produtos.filter(produto => produto.id !== id));
      })
      .catch(error => console.error("Erro ao deletar produto:", error));
  };

  if (loading) {
    return <p>Carregando produtos...</p>;
  }

  return (
    <div className="admin-page">
      <h1>Admin - Gerenciar Produtos</h1>

      <div className="create-product">
        <h2>Criar Novo Produto</h2>
        <input
          type="text"
          placeholder="Nome do Produto"
          value={novoProduto.nome}
          onChange={e => setNovoProduto({ ...novoProduto, nome: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descrição"
          value={novoProduto.descricao}
          onChange={e => setNovoProduto({ ...novoProduto, descricao: e.target.value })}
        />
        <input
          type="number"
          placeholder="Preço"
          value={novoProduto.preco}
          onChange={e => setNovoProduto({ ...novoProduto, preco: e.target.value })}
        />
        <input
          type="number"
          placeholder="Estoque"
          value={novoProduto.estoque}
          onChange={e => setNovoProduto({ ...novoProduto, estoque: e.target.value })}
        />
        <button onClick={handleCriarProduto}>Criar Produto</button>
      </div>

      <div className="product-list">
        <h2>Produtos Existentes</h2>
        <ul>
          {Array.isArray(produtos) && produtos.length > 0 ? (
            produtos.map(produto => (
              produto && produto.id ? (
                <li key={produto.id} className="product-item">
                  <p>{produto.nome} - R$ {produto.preco ? produto.preco.toFixed(2) : '0.00'}</p>
                  <button onClick={() => handleDeletarProduto(produto.id)}>Deletar</button>
                </li>
              ) : null
            ))
          ) : (
            <p>Nenhum produto encontrado.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Admin;
