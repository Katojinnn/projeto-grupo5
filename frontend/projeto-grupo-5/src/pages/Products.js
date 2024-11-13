import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../services/Api';

function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/produtos`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setError("Dados de produtos não estão no formato esperado.");
        }
      })
      .catch(error => {
        setError("Erro ao carregar produtos: " + error.message);
        console.error("Erro ao carregar produtos:", error);
      });
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

  const handleDeletarProduto = (id) => {
    fetch(`${API_URL}/produtos/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setProducts(products.filter(produto => produto.id !== id));
      })
      .catch(error => console.error("Erro ao deletar produto:", error));
  };

  return (
    <div className="products">
      <h1>Produtos</h1>

      {/* Exibe erro se houver */}
      {error && <p className="error">{error}</p>}

      <div className="product-list">
        {products.length === 0 ? (
          <p>Carregando produtos...</p>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}  // Função de adicionar ao carrinho
              onDelete={handleDeletarProduto}  // Função de deletar produto
            />
          ))
        )}
      </div>

      <div className="cart-info">
        <button onClick={goToCart}>Ir para o Carrinho</button>
      </div>
    </div>
  );
}

export default Products;
