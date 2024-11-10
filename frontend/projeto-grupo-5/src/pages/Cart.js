import React from 'react';
import { List, ListItem, ListItemText, Divider, Typography } from '@mui/material';

const Cart = ({ carrinho, subtotal, onCheckout }) => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Seu Carrinho
      </Typography>
      <List>
        {carrinho.map((produto, index) => (
          <div key={index}>
            <ListItem>
              <ListItemText
                primary={produto.nome}
                secondary={`R$ ${produto.preco.toFixed(2)}`}
              />
            </ListItem>
            {index < carrinho.length - 1 && <Divider />}
          </div>
        ))}
      </List>

      <Divider />

      <Typography variant="h6" style={{ marginTop: 20 }}>
        Subtotal: R$ {subtotal.toFixed(2)}
      </Typography>

      <button onClick={onCheckout} style={{ marginTop: 20 }}>Finalizar Compra</button>
    </div>
  );
};

export default Cart;
