import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ProductDetail.css';
import { API_URL } from '../services/Api';

function ProductDetail() {
  const { id } = useParams();
  console.log("ID do produto:", id);

  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      console.error("ID não encontrado na URL");
      return;
    }

    const url = `${API_URL}/api/produtos/${id}`;
    console.log("URL da requisição:", url);

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("Erro na requisição");
        }
        return response.json();
      })
      .then(data => {
        console.log("Dados do produto recebidos:", data);
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

  const preco = produto.preco !== undefined && produto.preco !== null ? produto.preco.toFixed(2) : '0.00';
  const descricao = produto.descricao || 'Descrição não disponível';

  return (
    <div className="product-detail">
      <h1>{produto.nome}</h1>
      <p>Preço: R$ {preco}</p>
      <p>Descrição: {descricao}</p>
    </div>
  );
}

export default ProductDetail;
