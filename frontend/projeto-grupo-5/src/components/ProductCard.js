// src/components/ProductCard.js
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

const ProductCard = ({ produto, onDelete, onAddToCart }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`https://poisonous-spooky-spirit-wr7xjgv9q54rhv47j-8080.app.github.dev/produtos/${produto.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onDelete(produto.id); // Atualiza a lista após exclusão
      } else {
        console.error('Erro ao excluir o produto');
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(produto); // Passa o produto para o método de adicionar ao carrinho
  };

  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image="https://via.placeholder.com/150"  // Imagem de exemplo
        alt={produto.nome}
      />
      <CardContent>
        <Typography variant="h6">{produto.nome}</Typography>
        <Typography variant="body2" color="text.secondary">
          {produto.descricao}
        </Typography>
        <Typography variant="h6" color="primary">
          R${produto.preco}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleAddToCart}>
          Adicionar ao Carrinho
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDelete}>
          Excluir
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
