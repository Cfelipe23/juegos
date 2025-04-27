import React from 'react';
import '../css/Home.css';
import Cabecera from '../components/Cabecera';
import BannerPrincipal from '../components/BannerPrincipal';
import ColeccionDeJuegos from '../components/ColeccionDeJuegos';

function Home() {
  return (
    <div className="home-wrapper">
      <Cabecera />
      <main className="main-content">
        <BannerPrincipal />
        <ColeccionDeJuegos />
      </main>
    </div>
  );
}

export default Home;