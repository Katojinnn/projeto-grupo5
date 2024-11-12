import React, { useState, useEffect } from 'react';
import '../styles/Checkout.css';

function Checkout() {
  const [carrinho, setCarrinho] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('carrinho')) || [];
    setCarrinho(cart);
    calcularSubtotal(cart);
  }, []);

  const calcularSubtotal = (itens) => {
    const subtotalCalculado = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    setSubtotal(subtotalCalculado);
  };

  const removerDoCarrinho = (id) => {
    const novosItens = carrinho.filter(item => item.id !== id);
    setCarrinho(novosItens);
    localStorage.setItem('carrinho', JSON.stringify(novosItens));
    calcularSubtotal(novosItens);
  };

  return (
    <div className="checkout-container">
      <h1>Resumo da Compra</h1>
      {carrinho.length === 0 ? (
        <p>Seu carrinho está vazio</p>
      ) : (
        <div>
          <h2>Produtos no Carrinho</h2>
          <ul className="checkout-items">
            {carrinho.map((item) => (
              <li key={item.id} className="checkout-item">
                <span>{item.nome}</span> - R$ {item.preco} x {item.quantidade}
                <button onClick={() => removerDoCarrinho(item.id)}>Remover</button>
              </li>
            ))}
          </ul>

          <div className="subtotal">
            <strong>Subtotal: R$ {subtotal.toFixed(2)}</strong>
          </div>

          <button className="finalizar-compra">Finalizar Compra</button>
        </div>
      )}
    </div>
  );
}

export default Checkout;
