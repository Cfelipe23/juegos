import React from 'react';
import banner from '../img/banner.png';

function HeroBanner() {
  return (
    <section className="section-one">
      <div className="background-container">
        <img src={ banner } alt="imagen de fondo" className="background-image-portada" />
        <div className="text-content">
          <h2>Juegos Interactivos</h2>
          <p>
            Una plataforma de juegos hecha para ti
            <br />
            Diseñada con react
          </p>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
