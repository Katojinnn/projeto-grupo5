// src/components/AdminPanel/ProductForm.js
import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/AdminPanel.css';

const ProductForm = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');

  // Função para enviar os dados do formulário para a API
  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name: productName,
      price: productPrice,
      description: productDescription,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/products', productData);
      console.log('Produto adicionado:', response.data);
      alert('Produto adicionado com sucesso!');
      setProductName('');
      setProductPrice('');
      setProductDescription('');
    } catch (err) {
      console.error('Erro ao adicionar produto:', err);
      alert('Erro ao adicionar produto');
    }
  };

  return (
    <div className="product-form-container">
      <h2>Adicionar Novo Produto</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <label>Nome do Produto</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <label>Preço</label>
        <input
          type="number"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          required
        />
        <label>Descrição</label>
        <textarea
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          required
        />
        <button type="submit" className="admin-button">Adicionar Produto</button>
      </form>
    </div>
  );
};

export default ProductForm;
