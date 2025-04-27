import React, { useState } from 'react';
import Tablero from './components/Tablero';
import Cabecera from '../../components/Cabecera';
import './JuegodeMemoria.css';

function JuegodeMemoria() {
  const [ reiniciar, setReiniciar ] = useState( false );
  const [ temaSeleccionado, setTemaSeleccionado ] = useState( null );
  const [ nombreJugador, setNombreJugador ] = useState( '' );
  const [ mostrarTablero, setMostrarTablero ] = useState( false );

  const manejarReinicio = () => {
    setReiniciar( prev => !prev );
  };

  const seleccionarTema = ( tema ) => {
    setTemaSeleccionado( tema );
    setMostrarTablero( true );
  };

  const volverInicio = () => {
    setMostrarTablero( false );
    setTemaSeleccionado( null );
    setNombreJugador( '' );
  };

  return (
    <>
      <Cabecera />
      <div className="App">

        <h1>Juego de Memoria</h1>

        { !mostrarTablero ? (
          <div className="menu-inicial">
            <input
              type="text"
              placeholder="Ingresa tu nombre"
              value={ nombreJugador }
              onChange={ ( e ) => setNombreJugador( e.target.value ) }
            />
            <p>Selecciona un tema:</p>
            <button onClick={ () => seleccionarTema( 'animales' ) }>🐷 Animales</button>
            <button onClick={ () => seleccionarTema( 'frutas' ) }>🍓 Frutas</button>
          </div>
        ) : (
          <>
            <div className="panel-controles">
              <p>Jugador: { nombreJugador }</p>
              <p>Tema: { temaSeleccionado }</p>
              <button onClick={ manejarReinicio }>↻ Reiniciar Juego</button>
              <button onClick={ volverInicio }>⬅ Volver</button>
            </div>
            <Tablero
              reiniciar={ reiniciar }
              nombreJugador={ nombreJugador }
              tema={ temaSeleccionado }
            />
          </>
        ) }
      </div>
    </>
  );
}

export default JuegodeMemoria;
