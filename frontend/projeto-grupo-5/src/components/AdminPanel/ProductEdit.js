// src/components/AdminPanel/ProductEdit.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/AdminPanel.css';

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: ''
  });

  // Carrega os dados do produto a ser editado
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        console.error('Erro ao carregar produto:', err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  // Função para enviar as alterações para a API
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:5000/api/products/${id}`, product);
      console.log('Produto atualizado:', response.data);
      alert('Produto atualizado com sucesso!');
      navigate('/admin/products'); // Redireciona para a página de listagem de produtos
    } catch (err) {
      console.error('Erro ao atualizar produto:', err);
      alert('Erro ao atualizar produto');
    }
  };

  return (
    <div className="product-form-container">
      <h2>Editar Produto</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <label>Nome do Produto</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
        />
        <label>Preço</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
        />
        <label>Descrição</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          required
        />
        <button type="submit" className="admin-button">Salvar Alterações</button>
      </form>
    </div>
  );
};

export default ProductEdit;
