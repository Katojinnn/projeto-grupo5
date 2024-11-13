import React from 'react';
import '../styles/ProductCard.css';

function ProductCard({ product, onAddToCart, onDelete }) {
  return (
    <div className="product-card">
      <img src={product.imagemUrl} alt={product.nome} className="product-image" />
      <div className="product-info">
        <h2>{product.nome}</h2>
        <p>{product.descricao}</p>
        <p>Preço: R${product.preco}</p>
        <p>Estoque: {product.estoque}</p>
        <div className="product-actions">
          {onDelete ? (
            <button onClick={() => onDelete(product.id)} className="delete-button">Deletar Produto</button>
          ) : (
            <button onClick={() => onAddToCart(product)} className="add-to-cart-button">Adicionar ao Carrinho</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
