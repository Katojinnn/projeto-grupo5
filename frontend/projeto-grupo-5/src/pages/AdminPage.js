// src/pages/AdminPage.js
import React, { useState } from 'react';
import { createProduto } from '../services/api';
import './AdminPage.css';

const AdminPage = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const produto = { nome, descricao, preco: parseFloat(preco), quantidadeEmEstoque: parseInt(quantidade) };

    try {
      await createProduto(produto);
      setMensagem("Produto criado com sucesso!");
      setNome('');
      setDescricao('');
      setPreco('');
      setQuantidade('');
    } catch (error) {
      console.error("Erro ao criar o produto:", error);
    }
  };

  return (
    <div className="admin-page">
      <h1 className="title">Adicionar Novo Produto</h1>
      {mensagem && <p className="success-message">{mensagem}</p>}
      <form className="product-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="number"
          placeholder="Quantidade em Estoque"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          required
          className="input-field"
        />
        <button type="submit" className="submit-btn">Adicionar Produto</button>
      </form>
    </div>
  );
};

export default AdminPage;
