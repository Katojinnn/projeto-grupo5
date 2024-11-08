// src/components/AdminPanel/ProductDelete.js
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductDelete = ({ id }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      alert('Produto excluído com sucesso!');
      navigate('/admin/products'); // Redireciona após a exclusão
    } catch (err) {
      console.error('Erro ao excluir produto:', err);
      alert('Erro ao excluir produto');
    }
  };

  return (
    <button onClick={handleDelete} className="delete-button">
      Excluir
    </button>
  );
};

export default ProductDelete;
