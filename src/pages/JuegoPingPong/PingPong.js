import React, { useState } from 'react';
import Menu from './componentes/Menu';
import Game from './componentes/Game';

function PingPong() {
  const [ level, setLevel ] = useState( null );

  const handleLevelSelect = ( nivel ) => {
    setLevel( nivel );
  };

  const handleBackToMenu = () => {
    setLevel( null );
  };

  return (
    <div>
      { !level && <Menu onLevelSelect={ handleLevelSelect } /> }
      { level === 2 && (
        <Game modo="cpu" onBackToMenu={ handleBackToMenu } />
      ) }
      { level === 3 && (
        <Game modo="pvp" onBackToMenu={ handleBackToMenu } />
      ) }
      { level === 1 && (
        <div style={ { textAlign: 'center', marginTop: '100px', color: 'white' } }>
          <h2>Modo "Solo" aún no está implementado.</h2>
          <button
            style={ {
              marginTop: '20px',
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#00ffcc',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer'
            } }
            onClick={ handleBackToMenu }
          >
            Volver al Menú
          </button>
        </div>
      ) }
    </div>
  );
}

export default PingPong;