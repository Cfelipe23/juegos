import React from 'react';
import CartaJuego from './CartaJuego';
import click from '../img/click.png';
import cartas from '../img/JuegoCartas.png';
import pingpong from '../img/super-ping-pong.png';
import serpiente from '../img/JuegoSerpiente.png';

function GameCollection() {
  const games = [
    {
      id: 1,
      title: 'Juego de Cuadro',
      image: click,
      path: '/JuegodeCuadro'
    },
    {
      id: 2,
      title: 'Juego de Memoria',
      image: cartas,
      path: '/JuegodeMemoria'

    },
    {
      id: 3,
      title: 'Juego de Ping Pong',
      image: pingpong,
      path: '/JuegoPingPong'
    },
    {
      id: 4,
      title: 'Juego de la Serpiente',
      image: serpiente,
      path: '/JuegoSerpiente'
    }
  ];

  return (
    <section className="section-two">
      { games.map( game => (
        <CartaJuego
          key={ game.id }
          image={ game.image }
          title={ game.title }
          path={ game.path }
        />

      ) ) }
    </section>
  );
}

export default GameCollection;