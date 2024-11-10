import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress, Snackbar } from '@mui/material';
import ProductCard from './ProductCard';
import { fetchProdutos } from '../services/api';

const ProductList = ({ carrinho, setCarrinho, updateSubtotal }) => {
  const [produtos, setProdutos] = useState([]); // Inicializando como um array vazio
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState('');

  const loadProdutos = async () => {
    const data = await fetchProdutos();
    if (Array.isArray(data)) {  // Garantindo que a resposta seja um array
      setProdutos(data);
    } else {
      console.error('A resposta não é um array:', data);
    }
    setLoading(false);
  };

  const handleAddToCart = (produto) => {
    const newCarrinho = [...carrinho, produto];
    setCarrinho(newCarrinho);
    updateSubtotal(newCarrinho);
    setMensagem('Produto adicionado com sucesso!');

    setTimeout(() => {
      setMensagem('');
    }, 3000); // Mensagem desaparece após 3 segundos
  };

  useEffect(() => {
    loadProdutos();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Grid container spacing={2}>
        {produtos.map((produto) => (
          <Grid item key={produto.id} xs={12} sm={6} md={4}>
            <ProductCard produto={produto} onAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>

      {mensagem && (
        <Snackbar
          open={true}
          message={mensagem}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          ContentProps={{
            style: {
              backgroundColor: 'green',
              color: 'white',
            },
          }}
        />
      )}
    </div>
  );
};

export default ProductList;
