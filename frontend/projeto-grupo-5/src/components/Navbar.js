import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';;

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          E-Commerce
        </Link>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/produtos">Produtos</Link>
          </li>
          <li>
            <Link to="/cart">
              <i className="cart-icon fas fa-shopping-cart"></i> Carrinho
            </Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;