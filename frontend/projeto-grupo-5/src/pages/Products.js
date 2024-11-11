import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../services/Api';

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/produtos`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Dados de produtos não estão no formato esperado.");
        }
      })
      .catch(error => console.error("Erro ao carregar produtos:", error));
  }, []);

  const addToCart = (product) => {
    let currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    currentCart.push(product);
    localStorage.setItem('cart', JSON.stringify(currentCart));

    alert(`${product.nome} foi adicionado ao carrinho!`);
  };

  const goToCart = () => {
    navigate('/cart');
  };

  return (
    <div className="products">
      <h1>Produtos</h1>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
          />
        ))}
      </div>

      <div className="cart-info">
        <button onClick={goToCart}>Ir para o Carrinho</button>
      </div>
    </div>
  );
}

export default Products;
