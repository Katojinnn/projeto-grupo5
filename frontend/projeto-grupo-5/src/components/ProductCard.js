import React from 'react';

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <img src={product.imagem} alt={product.nome} />
      <h3>{product.nome}</h3>
      <p>{product.descricao}</p>
      <p>R$ {product.preco.toFixed(2)}</p>
      <button onClick={() => onAddToCart(product)}>Adicionar ao Carrinho</button>
    </div>
  );
}

export default ProductCard;
