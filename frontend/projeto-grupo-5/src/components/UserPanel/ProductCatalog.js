// src/components/UserPanel/ProductCatalog.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/UserPanel.css';

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  
  // Função para carregar os produtos da API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);  // Atualiza o estado com os produtos
      } catch (err) {
        console.error('Erro ao obter os produtos:', err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="product-catalog">
      <header className="catalog-header">
        <h1>Catálogo de Produtos</h1>
        <p>Explore nossa seleção de produtos incríveis.</p>
      </header>

      <section className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-item">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <span>R$ {product.price}</span>
              <button className="buy-button">Comprar</button>
            </div>
          ))
        ) : (
          <p>Carregando produtos...</p>
        )}
      </section>
    </div>
  );
};

export default ProductCatalog;
