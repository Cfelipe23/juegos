import React from 'react';
import Cuadrado from './ImagenCuadrado';
import './TableroJuego.css';  // Importa el archivo CSS correspondiente

function TableroJuego( { puntos, tiempo, jugando, iniciarJuego, manejarClick, imagenSeleccionada, posicion } ) {
  return (
    <div className="tablero-juego">
      <div className="info-juego">
        <p>Puntuación: { puntos }</p>
        <p>Tiempo restante: { tiempo } segundos</p>
      </div>

      { jugando ? (
        <Cuadrado
          imagenSeleccionada={ imagenSeleccionada }
          manejarClick={ manejarClick }
          posicion={ posicion }
        />
      ) : (
        <button onClick={ iniciarJuego }>Iniciar Juego</button>
      ) }
    </div>
  );
}

export default TableroJuego;