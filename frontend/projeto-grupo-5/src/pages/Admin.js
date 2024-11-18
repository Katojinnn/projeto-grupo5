import React, { useState, useEffect } from 'react';
import { API_URL } from '../services/Api';
import PrivateRoute from '../components/PrivateRoute';

function Admin() {
  const [produtos, setProdutos] = useState([]);
  const [novoProduto, setNovoProduto] = useState({ nome: '', descricao: '', preco: '', estoque: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/produtos`)
      .then(response => response.json())
      .then(data => {
        setProdutos(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao carregar produtos:', error);
        setLoading(false);
      });
  }, []);

  const handleCriarProduto = () => {
    fetch(`${API_URL}/api/produtos`, {
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

  if (loading) {
    return <p>Carregando produtos...</p>;
  }

  return (
    <PrivateRoute requiredRole="admin">
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
            {produtos.map(produto => (
              <li key={produto.id}>
                <p>{produto.nome}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PrivateRoute>
  );
}

export default Admin;
