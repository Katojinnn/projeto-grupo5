import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          <img src="/assets/icons/logo.png" alt="logo" />
        </Link>
        <ul>
          <li>
            <Link to="/" className="home-icon">
              <img src="/assets/icons/home.svg" alt="Home" />
            </Link>
          </li>
          <li>
            <Link to="/produtos" className="produtos-icon">
              <img src="/assets/icons/caixa-aberta.svg" alt="Produtos" />
            </Link>
          </li>
          <li>
            <Link to="/cart" className="cart-icon">
              <img src="/assets/icons/carrinho-de-compras.svg" alt="Carrinho" />
            </Link>
          </li>
          <li>
            <Link to="/admin" className="admin-icon">
              <img src="/assets/icons/administrador.svg" alt="Admin" />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
