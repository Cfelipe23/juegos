import React, { useState } from 'react';
import './Ranking.css'; // Asegúrate de que tienes el CSS

function Ranking( { ranking } ) {
  const [ abierto, setAbierto ] = useState( false );

  const toggleRanking = () => {
    setAbierto( !abierto );
  };

  return (
    <>
      <button className="boton-ranking" onClick={ toggleRanking }>
        { abierto ? 'Cerrar Ranking' : 'Abrir Ranking' }
      </button>

      <div className={ `ranking-cuadrado ${ abierto ? 'open' : '' }` }>
        <h2>Ranking</h2>
        <ul>
          { ranking.map( ( jugador, index ) => (
            <li key={ index }>
              { index + 1 }. { jugador.nombre } - { jugador.puntos } puntos
            </li>
          ) ) }
        </ul>
      </div>
    </>
  );
}

export default Ranking;
