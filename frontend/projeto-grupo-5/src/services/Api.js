export const API_URL = 'https://poisonous-spooky-spirit-wr7xjgv9q54rhv47j-8080.app.github.dev/api';

export const getProdutos = async () => {
  const response = await fetch(`${API_URL}/produtos`);
  if (!response.ok) {
    throw new Error('Falha ao buscar produtos');
  }
  return response.json();
};

export const getProdutoById = async (id) => {
  const response = await fetch(`${API_URL}/produtos/${id}`);
  if (!response.ok) {
    throw new Error('Falha ao buscar o produto');
  }
  return response.json();
};

export const criarPedido = async (pedido) => {
  const response = await fetch(`${API_URL}/pedidos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pedido),
  });
  if (!response.ok) {
    throw new Error('Falha ao criar pedido');
  }
  return response.json();
};

export const getClientes = async () => {
  const response = await fetch(`${API_URL}/clientes`);
  if (!response.ok) {
    throw new Error('Falha ao buscar clientes');
  }
  return response.json();
};

export const criarCliente = async (cliente) => {
  const response = await fetch(`${API_URL}/clientes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cliente),
  });
  if (!response.ok) {
    throw new Error('Falha ao criar cliente');
  }
  return response.json();
};
