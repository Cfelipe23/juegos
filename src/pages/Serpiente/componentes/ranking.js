//muestra el top 5 (los mejores jugadores)
import React from "react";
const Ranking = ({ lista }) => (
  <div className="ranking">
    <h3>Tabla de puntuación</h3>
    <ol>
      {lista.map((j, i) => (
        <li key={i}>
          {j.nombre} - {j.puntos} pts
        </li>
      ))}
    </ol>
  </div>
);
export default Ranking;