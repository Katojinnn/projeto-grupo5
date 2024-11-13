// Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newInfo, setNewInfo] = useState({ nome: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(storedUser);
      setNewInfo({ nome: storedUser.nome, email: storedUser.email });
    }
  }, [navigate]);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleSave = () => {
    fetch(`API_URL/usuarios/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newInfo),
    })
      .then(response => response.json())
      .then(updatedUser => {
        setUser(updatedUser);
        setEditMode(false);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      })
      .catch(error => console.error('Erro ao salvar as alterações', error));
  };

  return (
    <div>
      <h1>Área Logada - Dashboard</h1>
      {user && (
        <div>
          <h2>Informações do Usuário</h2>
          {editMode ? (
            <div>
              <input
                type="text"
                value={newInfo.nome}
                onChange={e => setNewInfo({ ...newInfo, nome: e.target.value })}
              />
              <input
                type="email"
                value={newInfo.email}
                onChange={e => setNewInfo({ ...newInfo, email: e.target.value })}
              />
              <button onClick={handleSave}>Salvar</button>
            </div>
          ) : (
            <div>
              <p>Nome: {user.nome}</p>
              <p>Email: {user.email}</p>
              <button onClick={handleEditToggle}>Editar</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
