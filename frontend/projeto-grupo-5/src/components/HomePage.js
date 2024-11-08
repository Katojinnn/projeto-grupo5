import React from 'react';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="home-page-header">
        <h1>Bem-vindo ao E-commerce</h1>
        <p>Compre os melhores produtos com facilidade.</p>
      </div>

      <div className="home-page-content">
        <h2>Explore nossos produtos</h2>
        <p>Veja o nosso catálogo de produtos abaixo e faça suas compras.</p>
        <button>
          <a href="/catalog">Ir para o Catálogo</a>
        </button>
      </div>
    </div>
  );
}

export default HomePage;
