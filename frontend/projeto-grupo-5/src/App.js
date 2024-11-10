import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import ProductList from './components/ProductList';
import Cart from './pages/Cart';
import Header from './components/Header';
import AdminPage from './pages/AdminPage';

const App = () => {
  const [carrinho, setCarrinho] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  const updateSubtotal = (carrinho) => {
    if (Array.isArray(carrinho)) {
      const newSubtotal = carrinho.reduce((acc, produto) => acc + produto.preco, 0);
      setSubtotal(newSubtotal);
    }
  };

  const handleCheckout = () => {
    alert('Compra finalizada!');
    setCarrinho([]);
    setSubtotal(0);
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList carrinho={carrinho} setCarrinho={setCarrinho} updateSubtotal={updateSubtotal} />} />
        <Route path="/cart" element={<Cart carrinho={carrinho} subtotal={subtotal} onCheckout={handleCheckout} updateSubtotal={updateSubtotal} setCarrinho={setCarrinho} />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
};

export default App;
