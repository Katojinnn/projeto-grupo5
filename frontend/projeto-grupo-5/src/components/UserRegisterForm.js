// components/UserRegisterForm.js
import React, { useState } from 'react';
import { API_URL } from '../services/Api';

function UserRegisterForm() {
  const [userData, setUserData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/usuarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        setMessage('Usuário cadastrado com sucesso!');
        setUserData({ username: '', email: '', password: '' });
      } else {
        setMessage('Erro ao cadastrar usuário.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      setMessage('Erro ao cadastrar usuário.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastro de Usuário</h2>
      {message && <p>{message}</p>}
      <input
        type="text"
        name="username"
        value={userData.username}
        onChange={handleChange}
        placeholder="Nome de Usuário"
        required
      />
      <input
        type="email"
        name="email"
        value={userData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        value={userData.password}
        onChange={handleChange}
        placeholder="Senha"
        required
      />
      <button type="submit">Cadastrar Usuário</button>
    </form>
  );
}

export default UserRegisterForm;
