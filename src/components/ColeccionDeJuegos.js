import React from 'react';
import CartaJuego from './CartaJuego';
import click from '../img/click.png';
import cartas from '../img/JuegoCartas.png';
import pingpong from '../img/super-ping-pong.png';

function GameCollection() {
  const games = [
    {
      id: 1,
      title: 'Juego de Cuadro',
      image: click,
      path: '/Juegode_Cuadro'
    },
    {
      id: 2,
      title: 'Juego de Memoria',
      image: cartas,
      path: '/Juego_deMemoria'

    },
    {
      id: 3,
      title: 'Ping Pong',
      image: pingpong,
      path: '/PingPong'
    },
    {
      id: 4,
      title: 'Juego 4',
      image: null,
      path: '/Juego4'
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