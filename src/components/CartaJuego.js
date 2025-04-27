import React from 'react';
import BotonJugar from './BotonJugar';

function CartaJuego( { image, title, path } ) {
  return (
    <div className="pretty-square">
      { image && <img src={ image } alt={ title } className="background-image" /> }
      <div className="game-title">
        { title }
        <BotonJugar path={ path } />
      </div>
    </div>
  );
}
export default CartaJuego;
