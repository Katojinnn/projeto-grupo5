// components/AdminRegisterForm.js
import React, { useState } from 'react';
import { API_URL } from '../services/Api';

function AdminRegisterForm() {
  const [adminData, setAdminData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/administradores`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminData),
      });
      if (response.ok) {
        setMessage('Administrador cadastrado com sucesso!');
        setAdminData({ username: '', email: '', password: '' });
      } else {
        setMessage('Erro ao cadastrar administrador.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar administrador:', error);
      setMessage('Erro ao cadastrar administrador.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastro de Administrador</h2>
      {message && <p>{message}</p>}
      <input
        type="text"
        name="username"
        value={adminData.username}
        onChange={handleChange}
        placeholder="Nome de Usuário"
        required
      />
      <input
        type="email"
        name="email"
        value={adminData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        value={adminData.password}
        onChange={handleChange}
        placeholder="Senha"
        required
      />
      <button type="submit">Cadastrar Administrador</button>
    </form>
  );
}

export default AdminRegisterForm;
