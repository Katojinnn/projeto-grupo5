// ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProductCard.css';

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <Link to={`/produtos/${product.id}`} className="product-card-link">
        <h3>{product.nome}</h3>
        <p>Descrição: {product.descricao}</p>
        <p>R$ {product.preco.toFixed(2)}</p>
      </Link>
      <button onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}>
        Adicionar ao Carrinho
      </button>
    </div>
  );
}

export default ProductCard;
