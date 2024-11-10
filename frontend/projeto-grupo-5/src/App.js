import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import ProductList from './components/ProductList';
import Cart from './pages/Cart';
import Header from './components/Header';
import AdminPage from './pages/AdminPage';  // Adicione a importação do AdminPage

const App = () => {
  const [carrinho, setCarrinho] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  const handleCheckout = () => {
    alert('Compra finalizada!');
    setCarrinho([]);
    setSubtotal(0);
  };

  const updateSubtotal = (newCarrinho) => {
    const novoSubtotal = newCarrinho.reduce((total, produto) => total + produto.preco, 0);
    setSubtotal(novoSubtotal);
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<ProductList carrinho={carrinho} setCarrinho={setCarrinho} updateSubtotal={updateSubtotal} />}
        />
        <Route
          path="/cart"
          element={<Cart carrinho={carrinho} subtotal={subtotal} onCheckout={handleCheckout} />}
        />
        <Route path="/admin" element={<AdminPage />} />  {/* Adicione a rota para o AdminPage */}
      </Routes>
    </Router>
  );
};

export default App;
