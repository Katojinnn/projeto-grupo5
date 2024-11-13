// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../services/Api';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('user', JSON.stringify(data.user));
          navigate('/dashboard');
        } else {
          setErro('Credenciais inválidas');
        }
      })
      .catch(error => {
        setErro('Erro ao realizar o login');
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <input 
        type="email" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
        placeholder="Digite seu email"
      />
      <input 
        type="password" 
        value={senha} 
        onChange={e => setSenha(e.target.value)} 
        placeholder="Digite sua senha"
      />
      <button onClick={handleLogin}>Entrar</button>
      {erro && <p>{erro}</p>}
    </div>
  );
}

export default Login;
