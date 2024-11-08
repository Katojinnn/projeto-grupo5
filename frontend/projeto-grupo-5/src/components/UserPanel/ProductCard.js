import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button>Adicionar ao Carrinho</button>
    </div>
  );
};

export default ProductCard;
