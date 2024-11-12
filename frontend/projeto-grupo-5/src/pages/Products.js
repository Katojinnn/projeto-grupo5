import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../services/Api';

function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null); // Para exibir erros de forma mais clara
  const navigate = useNavigate();

  useEffect(() => {
    // Faz a requisição para obter os produtos
    fetch(`${API_URL}/produtos`)
      .then(response => response.json())
      .then(data => {
        console.log("Produtos recebidos:", data);
        
        // Verifica se a resposta é um array e se tem o formato correto
        if (Array.isArray(data)) {
          setProducts(data); // Atualiza o estado com os produtos
        } else {
          setError("Dados de produtos não estão no formato esperado.");
        }
      })
      .catch(error => {
        setError("Erro ao carregar produtos: " + error.message);
        console.error("Erro ao carregar produtos:", error);
      });
  }, []); // O efeito roda uma vez quando o componente for montado

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
      
      {/* Exibe erro se houver */}
      {error && <p className="error">{error}</p>}

      <div className="product-list">
        {products.length === 0 ? (
          <p>Carregando produtos...</p> // Exibe uma mensagem enquanto carrega os produtos
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
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
