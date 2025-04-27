import React from 'react';
import '../Carta.css';

function Carta( { carta, volteada, manejarClick } ) {
  return (
    <div className="carta" onClick={ manejarClick }>
      <div className={ `carta-inner ${ volteada ? 'volteada' : '' }` }>
        <div className="carta-front">
          <img src={ carta } alt="imagen de carta" />
        </div>
        <div className="carta-back">
          <span>❓</span>
        </div>
      </div>
    </div>
  );
}

export default Carta;
