// src/components/User/Cart.js
import React from 'react';

const Cart = ({ cartItems, removeFromCart }) => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

    return (
        <div>
            <h2>Carrinho</h2>
            <ul>
                {cartItems.map((item, index) => (
                    <li key={index}>
                        {item.name} - ${item.price}
                        <button onClick={() => removeFromCart(index)}>Remover</button>
                    </li>
                ))}
            </ul>
            <h3>Total: ${totalPrice}</h3>
        </div>
    );
};

export default Cart;
