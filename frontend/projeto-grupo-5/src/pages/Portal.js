import React, { useState, useEffect } from 'react';
import { API_URL } from '../services/Api';
import ProductCard from '../components/ProductCard';

function Portal() {
  const [produtos, setProdutos] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/produtos`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProdutos(data);
        } else {
          setErro('Erro ao carregar produtos');
        }
      })
      .catch(error => {
        setErro('Erro ao carregar produtos');
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Portal - Produtos</h1>
      {erro && <p>{erro}</p>}
      <div className="product-list">
        {produtos.map(produto => (
          <ProductCard key={produto.id} product={produto} />
        ))}
      </div>
    </div>
  );
}

export default Portal;
