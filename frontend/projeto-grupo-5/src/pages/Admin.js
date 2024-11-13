// pages/Admin.js
import React, { useState, useEffect } from 'react';
import { API_URL } from '../services/Api';
import ProductCard from '../components/ProductCard';

function Admin() {
  const [produtos, setProdutos] = useState([]);
  const [novoProduto, setNovoProduto] = useState({ nome: '', descricao: '', preco: '', estoque: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/produtos`)
      .then(response => response.json())
      .then(data => {
        setProdutos(data);
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
      <div>
        <h2>Criar Novo Produto</h2>
        <input type="text" value={novoProduto.nome} onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })} placeholder="Nome do Produto" />
        <input type="text" value={novoProduto.descricao} onChange={(e) => setNovoProduto({ ...novoProduto, descricao: e.target.value })} placeholder="Descrição" />
        <input type="number" value={novoProduto.preco} onChange={(e) => setNovoProduto({ ...novoProduto, preco: parseFloat(e.target.value) })} placeholder="Preço" />
        <input type="number" value={novoProduto.estoque} onChange={(e) => setNovoProduto({ ...novoProduto, estoque: parseInt(e.target.value) })} placeholder="Estoque" />
        <button onClick={handleCriarProduto}>Adicionar Produto</button>
      </div>

      <h2>Produtos Atuais</h2>
      {produtos.map(produto => (
        <ProductCard key={produto.id} product={produto} onDelete={handleDeletarProduto} />
      ))}
    </div>
  );
}

export default Admin;
