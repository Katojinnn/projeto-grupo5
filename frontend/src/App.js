// src/App.js
import React, { useState } from 'react';
import AdminProductList from './components/Admin/ProductList';
import AddProduct from './components/Admin/AddProduct';
import UserProductList from './components/User/ProductList';
import Cart from './components/User/Cart';

const App = () => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const removeFromCart = (index) => {
        const newCart = cart.filter((_, i) => i !== index);
        setCart(newCart);
    };

    return (
        <div>
            <h1>Site de Vendas</h1>
            <div>
                <h2>Área do Administrador</h2>
                <AddProduct />
                <AdminProductList />
            </div>
            <div>
                <h2>Área do Usuário</h2>
                <UserProductList addToCart={addToCart} />
                <Cart cartItems={cart} removeFromCart={removeFromCart} />
            </div>
        </div>
    );
};

export default App;
