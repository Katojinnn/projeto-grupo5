import React, { useState, useEffect } from 'react';
import '../styles/Cart.css';

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    alert("Pedido realizado com sucesso!");
    setCart([]);
    localStorage.setItem('cart', JSON.stringify([]));
  };

  return (
    <div className="cart">
      <h1>Carrinho</h1>
      {cart.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <p>{item.nome} - R$ {item.preco.toFixed(2)}</p>
              <button onClick={() => removeFromCart(item.id)}>Remover</button>
            </div>
          ))}
          <div className="cart-summary">
            <p><strong>Subtotal:</strong> R$ {cart.reduce((total, item) => total + item.preco, 0).toFixed(2)}</p>
            <button onClick={handleCheckout}>Finalizar Compra</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
