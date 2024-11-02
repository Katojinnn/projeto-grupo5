// src/components/Admin/ProductList.js
import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../../api';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const response = await getProducts();
        setProducts(response.data);
    };

    const handleDelete = async (id) => {
        await deleteProduct(id);
        loadProducts();
    };

    return (
        <div>
            <h2>Gerenciar Produtos</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name} - ${product.price} (Estoque: {product.stock})
                        <button onClick={() => handleDelete(product.id)}>Remover</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
