import React from 'react';
import { Link } from 'react-router-dom';

function ProductItem({ produto }) {
  return (
    <div>
      <h2>{produto.nome}</h2>
      <p>{produto.descricao}</p>
      <p>Preço: R${produto.preco}</p>
      <Link to={`/produto/${produto.id}`}>Ver Detalhes</Link>
    </div>
  );
}

export default ProductItem;
