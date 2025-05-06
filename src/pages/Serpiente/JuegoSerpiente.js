
//componestes principales del juego
import React, { useState, useEffect, useRef } from 'react';
import Inicio from './componentes/Inicio';
import Puntos from './componentes/Puntos';
import Tablero from './componentes/Tablero';
import FinJuego from './componentes/finJuego';
import { FILAS, COLUMNAS, DIRECCIONES } from './componentes/Config';
import './JuegoSerpiente.css';


const JuegoSerpiente = () => {
  const [ nombreJugador, setNombreJugador ] = useState( "" ); //estado del nombre del jugador para mostrarlo y para el ranking
  const [ jugando, setJugando ] = useState( false ); //indica si la partida esta en curso
  const [ serpiente, setSerpiente ] = useState( [ [ 8, 8 ] ] ); //array que representa cada segmento de la serpiente
  const [ comida, setComida ] = useState( [ 10, 10 ] ); //coordenadas de la comida
  const [ direccion, setDireccion ] = useState( "DERECHA" ); // direccion actual de la serpiente
  const [ terminado, setTerminado ] = useState( false ); // marca que la partida ha terminado
  const [ puntos, setPuntos ] = useState( 0 ); //cuenta los puntos que ha hecho el jugador (las veces que la serpiente ha comido)

  //ranking de los 5 mejores cargado en un localStorage
  const [ ranking, setRanking ] = useState( () => {
    const guardado = localStorage.getItem( "ranking_serpiente" );
    return guardado ? JSON.parse( guardado ) : [];

  } );

  //captura los eventos del teclado
  const contenedorRef = useRef( null );


  //que captura las flechas del teclado para cambiar de direccion de manera correcta
  useEffect( () => {
    const manejarTecla = e => {

      switch ( e.key ) {
        case 'ArrowUp': if ( direccion !== "ABAJO" ) setDireccion( "ARRIBA" ); break;
        case 'ArrowDown': if ( direccion !== "ARRIBA" ) setDireccion( "ABAJO" ); break;
        case 'ArrowLeft': if ( direccion !== "DERECHA" ) setDireccion( "IZQUIERDA" ); break;
        case 'ArrowRight': if ( direccion !== "IZQUIERDA" ) setDireccion( "DERECHA" ); break;
        default: break;
      }
    };


    document.addEventListener( 'keydown', manejarTecla );
    return () => document.removeEventListener( 'keydown', manejarTecla );
  }, [ direccion ] );


  //crea un bucle que mueve la serpiente a una velocidad de 75ms mientras se esta jugando
  useEffect( () => {
    if ( !jugando || terminado ) return;
    const intervalo = setInterval( () => moverSerpiente(), 75 );
    return () => clearInterval( intervalo );
  }, [ jugando, terminado, direccion, serpiente ] );


  //cuando se termina la partida, guarda el resultado en el ranking
  useEffect( () => {
    if ( terminado && nombreJugador.trim() ) {
      const nuevo = { nombre: nombreJugador.trim(), puntos };

      const guardado = localStorage.getItem( "ranking_serpiente" );
      const actual = guardado ? JSON.parse( guardado ) : [];

      const actualizado = [ ...actual, nuevo ]
        .sort( ( a, b ) => b.puntos - a.puntos )
        .slice( 0, 5 );

      localStorage.setItem( "ranking_serpiente", JSON.stringify( actualizado ) );
      setRanking( actualizado );

      //console.log("Ranking antes de actualizar:", ranking);
      //console.log("Nuevo jugador:", nuevo);
      //console.log("Ranking después de agregar/actualizar:", actualizado);
    }
  }, [ terminado, nombreJugador, puntos ] );


  //mueve la serpiente segun la direccion, ademas de comprueba coliciones y come comida
  const moverSerpiente = () => {
    // vector de movimiento
    const movimiento = DIRECCIONES[ direccion ];

    //clona la cabeza y aplica el movimiento
    const cabeza = [ ...serpiente[ 0 ] ];
    cabeza[ 0 ] += movimiento[ 0 ];
    cabeza[ 1 ] += movimiento[ 1 ];

    //comprueba coliciones con las paredes o con el mismo cuerpo
    if (
      cabeza[ 0 ] < 0 || cabeza[ 0 ] >= FILAS ||
      cabeza[ 1 ] < 0 || cabeza[ 1 ] >= COLUMNAS ||
      serpiente.some( segmento => segmento[ 0 ] === cabeza[ 0 ] && segmento[ 1 ] === cabeza[ 1 ] )
    ) {
      setTerminado( true );
      return;
    }

    //construye la "nueva serpiente" (añade la cabeza al frente)
    const nuevaSerpiente = [ cabeza, ...serpiente ];

    //si la serpiente come la comida esta crece y se genera nueva "comida"
    if ( cabeza[ 0 ] === comida[ 0 ] && cabeza[ 1 ] === comida[ 1 ] ) {
      setPuntos( puntos + 1 );
      let nuevaComida;
      do {
        nuevaComida = [
          Math.floor( Math.random() * FILAS ),
          Math.floor( Math.random() * COLUMNAS )
        ];
      } while ( nuevaSerpiente.some( seg => seg[ 0 ] === nuevaComida[ 0 ] && seg[ 1 ] === nuevaComida[ 1 ] ) );
      setComida( nuevaComida );
    } else {
      //si no come, elimina el ultimo segmento para simular movimiento
      nuevaSerpiente.pop();
    }

    setSerpiente( nuevaSerpiente );
  };

  //inicia nueva partida reseteando los datos anteriones
  const iniciarJuego = () => {
    if ( nombreJugador.trim() ) {
      setJugando( true );
      setTerminado( false );
      setSerpiente( [ [ 8, 8 ] ] );
      setComida( [ 10, 10 ] );
      setDireccion( "DERECHA" );
      setPuntos( 0 );
    }
  };

  //reinicia todo el juego y vuelve a la pantalla de inicio
  const reiniciarJuego = () => {
    setNombreJugador( "" ); // ← Esto regresa al inicio
    setPuntos( 0 );
    setComida( [ 10, 10 ] );
    setSerpiente( [ [ 8, 8 ] ] );
    setDireccion( "DERECHA" );
    setTerminado( false );
    setJugando( false );

  };


  return (
    <div className="juego-serpiente-container"> {/* Contenedor principal agregado */ }
      <div
        className="contenedor-juego"
        ref={ contenedorRef }
        tabIndex={ 0 }
        style={ { outline: 'none' } }
      >
        <h1>Juego de la Culebrita</h1>
        { !jugando && !terminado && (
          <Inicio
            nombre={ nombreJugador }
            onChange={ setNombreJugador }
            onStart={ iniciarJuego }
          />
        ) }

        { jugando && !terminado && (
          <>
            <Puntos puntos={ puntos } />
            <Tablero
              filas={ FILAS }
              columnas={ COLUMNAS }
              serpiente={ serpiente }
              comida={ comida }
            />
          </>
        ) }

        { terminado && (
          <FinJuego
            nombre={ nombreJugador }
            puntos={ puntos }
            ranking={ ranking }
            onRestart={ reiniciarJuego }
          />
        ) }
      </div>
    </div>
  );
};

export default JuegoSerpiente;
