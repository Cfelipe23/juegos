import React, { useState, useEffect } from 'react';
import Carta from './Carta';
import '../Tablero.css';

import cerdo from '../imagenes/cerdo.png';
import gallina from '../imagenes/gallina.png';
import gallo from '../imagenes/gallo.png';
import hamster from '../imagenes/hamster.jpg';
import conejo from '../imagenes/conejo.png';
import oveja from '../imagenes/oveja.png';
import pato from '../imagenes/pato.png';
import vaca from '../imagenes/vaca.png';
import cabra from '../imagenes/cabra.png';
import tortuga from '../imagenes/tortuga.jpg';

import manzana from '../imagenes/manzana.png';
import banano from '../imagenes/banano.png';
import sandia from '../imagenes/sandia.png';
import uva from '../imagenes/uva.png';
import pina from '../imagenes/piña.png';
import fresa from '../imagenes/fresa.png';
import naranja from '../imagenes/naranja.png';
import cereza from '../imagenes/cereza.png';
import coco from '../imagenes/coco.png';
import pera from '../imagenes/pera.png';

const simbolosBase = {
  animales: [
    cerdo,
    gallina,
    gallo,
    hamster,
    conejo,
    oveja,
    pato,
    vaca,
    cabra,
    tortuga,
  ],
  frutas: [
    manzana,
    banano,
    sandia,
    uva,
    pina,
    fresa,
    naranja,
    cereza,
    coco,
    pera,
  ],
};

function Tablero( { reiniciar, nombreJugador, tema = 'animales' } ) {
  const [ cartas, setCartas ] = useState( [] );
  const [ seleccionadas, setSeleccionadas ] = useState( [] );
  const [ parejasEncontradas, setParejasEncontradas ] = useState( [] );
  const [ intentos, setIntentos ] = useState( 0 );
  const [ tiempo, setTiempo ] = useState( 0 );
  const [ activo, setActivo ] = useState( true );
  const [ fondo, setFondo ] = useState( 'fondoAnimales' );
  const [ ranking, setRanking ] = useState( [] );

  const inicializarCartas = () => {
    const simbolos = simbolosBase[ tema ];
    const nuevasCartas = [ ...simbolos, ...simbolos ]
      .sort( () => Math.random() - 0.5 )
      .map( ( simbolo, index ) => ( { id: index, simbolo } ) );
    setCartas( nuevasCartas );
    setSeleccionadas( [] );
    setParejasEncontradas( [] );
    setIntentos( 0 );
    setTiempo( 0 );
    setActivo( true );
  };

  useEffect( () => {
    inicializarCartas();
  }, [ reiniciar, tema ] );

  useEffect( () => {
    let intervalo;
    if ( activo ) {
      intervalo = setInterval( () => {
        setTiempo( ( prev ) => prev + 1 );
      }, 1000 );
    }
    return () => clearInterval( intervalo );
  }, [ activo ] );

  const manejarClick = ( index ) => {
    if (
      seleccionadas.length < 2 &&
      !seleccionadas.includes( index ) &&
      !parejasEncontradas.includes( index )
    ) {
      setSeleccionadas( [ ...seleccionadas, index ] );
    }
  };

  useEffect( () => {
    if ( seleccionadas.length === 2 ) {
      const [ primera, segunda ] = seleccionadas;
      if ( cartas[ primera ].simbolo === cartas[ segunda ].simbolo ) {
        setParejasEncontradas( ( prev ) => [ ...prev, primera, segunda ] );
      }
      setIntentos( ( prev ) => prev + 1 );
      setTimeout( () => setSeleccionadas( [] ), 1000 );
    }
  }, [ seleccionadas ] );

  useEffect( () => {
    if ( parejasEncontradas.length === cartas.length && cartas.length > 0 ) {
      setActivo( false );
      const rankingGuardado = guardarEnRanking( nombreJugador, intentos, tiempo, tema );
      setRanking( rankingGuardado ); // Actualiza el ranking por tema
    }
  }, [ parejasEncontradas ] );

  const guardarEnRanking = ( nombre, intentos, tiempo, tema ) => {
    const nuevaEntrada = { nombre, intentos, tiempo };
    const rankingGuardado =
      JSON.parse( localStorage.getItem( `rankingMemoria_${ tema }` ) ) || [];
    rankingGuardado.push( nuevaEntrada );
    rankingGuardado.sort( ( a, b ) => a.intentos - b.intentos || a.tiempo - b.tiempo );
    const top5 = rankingGuardado.slice( 0, 5 ); // Solo los primeros 5
    localStorage.setItem( `rankingMemoria_${ tema }`, JSON.stringify( top5 ) );

    return top5;
  };

  const cambiarTema = ( nuevoTema ) => {
    setFondo( nuevoTema === 'animales' ? 'fondoAnimales' : 'fondoFrutas' );
  };

  return (
    <div className={ `tablero ${ fondo }` }>
      <div className="info-panel">
        <p>Jugador: { nombreJugador }</p>
        <p>Intentos: { intentos }</p>
        <p>Tiempo: { Math.floor( tiempo / 60 ) }m { tiempo % 60 }s</p>
        <p>Tema: { tema }</p>
      </div>

      {/* Si el juego terminó, mostramos el ranking */ }
      { !activo && (
        <div className="ranking">
          <h2>🏆 Ranking Final - { tema }</h2>
          <ul>
            { ranking.map( ( jugador, index ) => (
              <li key={ index }>
                { index + 1 }. { jugador.nombre } - { jugador.intentos } intentos - { Math.floor( jugador.tiempo / 60 ) }m { jugador.tiempo % 60 }s
              </li>
            ) ) }
          </ul>
        </div>
      ) }

      { activo && cartas.map( ( carta, index ) => (
        <Carta
          key={ index }
          carta={ carta.simbolo }
          volteada={ seleccionadas.includes( index ) || parejasEncontradas.includes( index ) }
          manejarClick={ () => manejarClick( index ) }
        />
      ) ) }
    </div>
  );
}

export default Tablero;
