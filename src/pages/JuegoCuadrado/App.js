import React, { useState, useEffect } from 'react';
import cuadrado from './components/img/Blinky_main_image_large.webp';
import './App.css';



function App() {
  const [ puntos, setPuntos ] = useState( 0 ); // Estado para la puntuación
  const [ posicion, setPosicion ] = useState( { top: '50%', left: '50%' } );
  //Estado para la posición del cuadrado;

  const [ tiempo, setTiempo ] = useState( 30 ); // Estado para el temporizador ( 30 segundos)
  const [ jugando, setJugando ] = useState( false ); // Estado para saber si el juego está en marcha
  // Función para iniciar el juego
  const iniciarJuego = () => {
    setPuntos( 0 );
    setTiempo( 30 );
    setJugando( true );
    moverCuadrado(); // Mueve el cuadrado al iniciar el juego
  };
  // Función para mover el cuadrado a una posición aleatoria
  const moverCuadrado = () => {
    const top = Math.random() * 90 + '%'; // Genera una posición aleatoria
    const left = Math.random() * 90 + '%';
    setPosicion( { top, left } );
  };
  // Manejar el clic en el cuadrado
  const manejarClick = () => {
    setPuntos( puntos + 1 ); // Incrementa los puntos
    moverCuadrado(); // Mueve el cuadrado a una nueva posición
  };
  // Hook para controlar el temporizador
  useEffect( () => {
    if ( jugando && tiempo > 0 ) {
      const timer = setInterval( () => setTiempo( tiempo - 1 ), 1000 );// Reduce el tiempo en 1 cada segundo
      return () => clearInterval( timer ); // Limpia el intervalo al desmontar
    } else if ( tiempo === 0 ) {
      setJugando( false ); // Finaliza el juego cuando el tiempo llega a 0
    }
  }, [ jugando, tiempo ] );
  return (
    <div className="App">
      <h1>¡Atrapa el cuadrado!</h1>
      <p>Puntuación: { puntos }</p>
      <p>Tiempo restante: { tiempo } segundos</p>
      { jugando ? (

        <img
          src={ cuadrado }
          alt="Cuadrado"
          className="cuadrado"
          style={ {
            position: 'absolute', top: posicion.top, left:

              posicion.left
          } }

          onClick={ manejarClick }
        ></img>


      ) : (
        <button onClick={ iniciarJuego }>Iniciar Juego</button>
      ) }
      { !jugando && tiempo === 0 && <h2>¡Juego terminado! Puntuación final:
        { puntos }</h2> }
    </div>
  );


}
export default App;
