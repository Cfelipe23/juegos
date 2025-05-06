import Cabecera from '../../components/Cabecera';
import Encabezado from "./components/Encabezado";
import TableroJuego from "./components/TableroJuego";
import Ranking from "./components/Ranking";

import cuadrado1 from './imagenes/imagen_perfil_1.jpeg';
import cuadrado2 from './imagenes/imagen_perfil_2.jpeg';
import cuadrado3 from './imagenes/imagen_perfil_3.jpeg';

import React, { useState, useEffect } from 'react';
import './Cuadrado.css';

function Cuadrado() {
  const imagenesDisponibles = [
    { nombre: 'Ardilla Rokera', src: cuadrado1 },
    { nombre: 'Pollo Rockero', src: cuadrado2 },
    { nombre: 'Perro Rockero', src: cuadrado3 },
  ];

  const [ puntos, setPuntos ] = useState( 0 );
  const [ posicion, setPosicion ] = useState( { top: '50%', left: '50%' } );
  const [ tiempo, setTiempo ] = useState( 30 );
  const [ jugando, setJugando ] = useState( false );
  const [ ranking, setRanking ] = useState( [] );
  const [ imagenSeleccionada, setImagenSeleccionada ] = useState( cuadrado1 );
  const [ nombreJugador, setNombreJugador ] = useState( '' );

  useEffect( () => {
    const rankingGuardado = JSON.parse( localStorage.getItem( 'ranking' ) );
    if ( rankingGuardado ) {
      setRanking( rankingGuardado );
    }
  }, [] );

  useEffect( () => {
    if ( jugando && tiempo > 0 ) {
      const timer = setInterval( () => setTiempo( prev => prev - 1 ), 1000 );
      return () => clearInterval( timer );
    } else if ( jugando && tiempo === 0 ) {
      finalizarJuego();
    }
  }, [ jugando, tiempo ] );

  const iniciarJuego = () => {
    if ( !nombreJugador.trim() ) {
      alert( 'Por favor ingresa tu nombre antes de jugar.' );
      return;
    }
    setPuntos( 0 );
    setTiempo( 30 );
    setJugando( true );
    moverCuadrado();
  };

  const finalizarJuego = () => {
    setJugando( false );
    const nuevoJugador = { nombre: nombreJugador, puntos, tiempoUsado: 30 - tiempo };
    const nuevoRanking = [ ...ranking, nuevoJugador ]
      .sort( ( a, b ) => b.puntos - a.puntos || a.tiempo - b.tiempo )
      .slice( 0, 5 );
    setRanking( nuevoRanking );
    localStorage.setItem( 'ranking', JSON.stringify( nuevoRanking ) );
  };

  const moverCuadrado = () => {
    const top = Math.random() * 70 + 10 + '%';
    const left = Math.random() * 70 + 10 + '%';
    setPosicion( { top, left } );
  };

  const manejarClick = () => {
    setPuntos( prev => prev + 1 );
    moverCuadrado();
  };


  return (
    <>
      <Cabecera />
      <div className="container-cuadrado">
        <h1>¡Atrapa el cuadrado!</h1>
        <Ranking ranking={ ranking } />
        <Encabezado
          nombreJugador={ nombreJugador }
          setNombreJugador={ setNombreJugador }
          imagenSeleccionada={ imagenSeleccionada }
          setImagenSeleccionada={ setImagenSeleccionada }
          jugando={ jugando }
          imagenes={ imagenesDisponibles }
        />

        <TableroJuego
          puntos={ puntos }
          tiempo={ tiempo }
          jugando={ jugando }
          iniciarJuego={ iniciarJuego }
          manejarClick={ manejarClick }
          imagenSeleccionada={ imagenSeleccionada }
          posicion={ posicion }
        />


      </div>

    </>
  );
}

export default Cuadrado;
