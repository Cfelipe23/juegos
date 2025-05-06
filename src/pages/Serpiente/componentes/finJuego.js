//Se encarga de mostrar la pantalla final del juego
import React from "react";
import Ranking from "./ranking";
const FinJuego = ({ nombre, puntos, ranking, onRestart }) => (
  <div className="fin-juego">
    <h2>¡Juego terminado, {nombre}!</h2>
    <p>Tu puntuación: {puntos}</p>
    <button onClick={onRestart}>Reiniciar</button>
    <Ranking lista={ranking} />
  </div>
);
export default FinJuego;