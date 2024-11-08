// src/services/api.js

import axios from 'axios';

// URL da API (ajuste conforme necessário)
const API_URL = 'https://example.com/api/'; 

// Função para obter todos os produtos
export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}products`);
    return response.data || []; // Garantir que retorne um array
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return []; // Retorna um array vazio em caso de erro
  }
};

// Função para obter um produto específico
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}products/${id}`);
    return response.data || {}; // Retorna um objeto vazio se não encontrar
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    return {}; // Retorna um objeto vazio em caso de erro
  }
};

// Função para criar um novo produto
export const createProduct = async (product) => {
  try {
    const response = await axios.post(`${API_URL}products`, product);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar produto:', error);
  }
};

// Função para atualizar um produto existente
export const updateProduct = async (id, product) => {
  try {
    const response = await axios.put(`${API_URL}products/${id}`, product);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
  }
};
