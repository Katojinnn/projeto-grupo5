// Admin.js
import React, { useState, useEffect } from 'react';
import { API_URL } from '../services/Api';
import ProductCard from '../components/ProductCard';

function Admin() {
  const [produtos, setProdutos] = useState([]);
  const [novoProduto, setNovoProduto] = useState({ nome: '', descricao: '', preco: '', estoque: '' });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser || storedUser.role !== 'admin') {
      alert('Acesso restrito');
      window.location.href = '/login'; // Redireciona para o login se não for admin
    } else {
      setUser(storedUser);
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
    }
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
      {/* Resto do código */}
    </div>
  );
}

export default Admin;
