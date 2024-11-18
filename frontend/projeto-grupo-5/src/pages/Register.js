import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { criarCliente } from '../services/Api';

function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await criarCliente({ nome, email, senha });
      localStorage.setItem('token', response.token); // Armazenar o token do cliente
      navigate('/produtos');  // Redireciona para a página de produtos
    } catch (err) {
      setError('Erro ao registrar cliente');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Cadastro</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button type="submit">Registrar</button>
    </form>
  );
}

export default Register;
