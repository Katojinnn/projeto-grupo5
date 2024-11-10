import React, { useEffect } from 'react';
import { List, ListItem, ListItemText, Divider, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = ({ carrinho, setCarrinho, subtotal, onCheckout, updateSubtotal }) => {
  const navigate = useNavigate();

  const handleRemoveFromCart = (index) => {
    const newCarrinho = carrinho.filter((_, i) => i !== index);
    setCarrinho(newCarrinho);
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  useEffect(() => {
    updateSubtotal(carrinho); // Atualiza o subtotal sempre que o carrinho mudar
  }, [carrinho, updateSubtotal]);

  return (
    <div className="cart-container">
      <Typography variant="h4" className="cart-title">
        Seu Carrinho
      </Typography>
      <List>
        {carrinho.map((produto, index) => (
          <div key={index}>
            <ListItem className="cart-item">
              <ListItemText
                primary={produto.nome}
                secondary={`R$ ${produto.preco.toFixed(2)}`}
              />
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleRemoveFromCart(index)}
              >
                Remover
              </Button>
            </ListItem>
            {index < carrinho.length - 1 && <Divider />}
          </div>
        ))}
      </List>

      <Divider />

      <Typography variant="h6" className="cart-subtotal">
        Subtotal: R$ {subtotal.toFixed(2)}
      </Typography>

      <Box className="cart-buttons">
        <Button
          variant="contained"
          color="primary"
          onClick={onCheckout}
        >
          Finalizar Compra
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          onClick={handleContinueShopping}
        >
          Continuar Comprando
        </Button>
      </Box>
    </div>
  );
};

export default Cart;
