import React from 'react';

function ImagenCuadrado( { imagenSeleccionada, manejarClick, posicion } ) {
  return (
    <img
      src={ imagenSeleccionada }
      alt="Cuadrado"
      className="cuadrado"
      style={ { position: 'absolute', top: posicion.top, left: posicion.left } }
      onClick={ manejarClick }
    />
  );
}

export default ImagenCuadrado;
