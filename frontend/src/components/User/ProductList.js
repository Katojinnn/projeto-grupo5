// src/components/User/ProductList.js
import React, { useEffect, useState } from 'react';
import { getProducts } from '../../api';
import Cart from './Cart';

const UserProductList = ({ addToCart }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const response = await getProducts();
        setProducts(response.data);
    };

    return (
        <div>
            <h2>Catálogo de Produtos</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name} - ${product.price}
                        <button onClick={() => addToCart(product)}>Adicionar ao Carrinho</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserProductList;
