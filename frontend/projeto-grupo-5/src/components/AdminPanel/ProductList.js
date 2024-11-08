import React from 'react';

const ProductList = ({ products, onDelete }) => {
  return (
    <div>
      <h2>Lista de Produtos</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => onDelete(product.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
