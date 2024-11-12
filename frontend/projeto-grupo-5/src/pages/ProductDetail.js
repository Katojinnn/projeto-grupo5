import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ProductDetail.css';
import { API_URL } from '../services/Api';

function ProductDetail() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/produtos/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduto(data);
        setLoading(false);
      })
      .catch(error => console.error("Erro ao carregar produto:", error));
  }, [id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!produto) {
    return <p>Produto não encontrado</p>;
  }

  const preco = produto.preco ? produto.preco.toFixed(2) : '0.00';

  return (
    <div className="product-detail">
      <h1>{produto.nome}</h1>
      <p>Preço: R$ {preco}</p>
      <p>Descrição: {produto.descricao}</p>
    </div>
  );
}

export default ProductDetail;
