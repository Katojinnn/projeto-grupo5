// pages/RegisterPage.js
import React from 'react';
import AdminRegisterForm from '../components/AdminRegisterForm';
import UserRegisterForm from '../components/UserRegisterForm';

function RegisterPage() {
  return (
    <div className="register-page">
      <h1>Página de Registro</h1>
      <div className="form-container">
        <AdminRegisterForm />
        <UserRegisterForm />
      </div>
    </div>
  );
}

export default RegisterPage;
