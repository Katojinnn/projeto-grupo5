// src/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // ajuste conforme sua API
});

export const getProducts = () => api.get('/products');
export const addProduct = (product) => api.post('/products', product);
export const deleteProduct = (id) => api.delete(`/products/${id}`);
