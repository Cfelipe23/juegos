import React from 'react';
import "./Encabezado.css";
function Encabezado( { nombreJugador, setNombreJugador, imagenSeleccionada, setImagenSeleccionada, jugando, imagenes } ) {
  return (
    <div className="encabezado">
      <input
        type="text"
        placeholder="Tu nombre"
        value={ nombreJugador }
        onChange={ ( e ) => setNombreJugador( e.target.value ) }
        disabled={ jugando }
      />
      <div className="selector-imagenes">
        <label>Elige tu imagen:</label>
        <select
          onChange={ ( e ) => setImagenSeleccionada( e.target.value ) }
          value={ imagenSeleccionada }
          disabled={ jugando }
        >
          { imagenes.map( ( img, index ) => (
            <option key={ index } value={ img.src }>
              { img.nombre }
            </option>
          ) ) }
        </select>
      </div>
    </div>
  );
}

export default Encabezado;
