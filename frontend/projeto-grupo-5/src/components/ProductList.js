import React, { useEffect, useState } from 'react';
import { getProdutos } from '../services/api';
import ProductItem from './ProductItem';

function ProductList() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProdutos()
      .then((data) => {
        setProdutos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao carregar produtos:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Carregando produtos...</p>;
  }

  return (
    <div>
      {produtos.map((produto) => (
        <ProductItem key={produto.id} produto={produto} />
      ))}
    </div>
  );
}

export default ProductList;
