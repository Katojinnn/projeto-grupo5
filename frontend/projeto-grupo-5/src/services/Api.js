export const API_URL = 'https://cautious-pancake-wr7xjgv9qj9p39q69-8080.app.github.dev';

export const getProdutos = async () => {
  const response = await fetch(`${API_URL}/api/produtos`);
  if (!response.ok) {
    throw new Error('Falha ao buscar produtos');
  }
  return response.json();
};

export const getProdutoById = async (id) => {
  const response = await fetch(`${API_URL}/api/produtos/${id}`);
  if (!response.ok) {
    throw new Error('Falha ao buscar o produto');
  }
  return response.json();
};

export const criarPedido = async (pedido) => {
  const response = await fetch(`${API_URL}/api/pedidos`, {
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
  const response = await fetch(`${API_URL}/api/clientes`);
  if (!response.ok) {
    throw new Error('Falha ao buscar clientes');
  }
  return response.json();
};

export const criarCliente = async (cliente) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token de autenticação não encontrado');
  }

  try {
    const response = await fetch(`${API_URL}/api/clientes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(cliente),
    });

    // Verifica se a resposta não foi bem-sucedida
    if (!response.ok) {
      const errorData = await response.json();  // Captura o erro retornado pela API
      throw new Error(`Erro ao criar cliente: ${response.status} - ${errorData.message || response.statusText}`);
    }

    return response.json();
  } catch (err) {
    console.error('Erro ao criar cliente:', err.message);
    throw err;  // Propaga o erro
  }
};


