import React from "react";
import Celda from "./Celda";
const Tablero = ({ filas, columnas, serpiente, comida }) => {
  const celdas = [];

  //creamos las filas y columnas del tablero
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {

      //para cada i o j comprobamos si hay un segmento de serpiente o comida
      const esSerpiente = serpiente.some(([x, y]) => x === i && y === j);
      const esComida = comida[0] === i && comida[1] === j;
      celdas.push(
        <Celda
          key={`${i}-${j}`} //es fundamental para que react diferencie cada componente de la lista
          tipo={esSerpiente ? "serpiente" : esComida ? "comida" : "vacia"}
        />
      );
    }
  }
  //lo envolvemos todo en un contenedor
  return <div className="tablero">{celdas}</div>;
};
export default Tablero;