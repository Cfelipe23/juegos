//datos del principio del juego
import React from "react";
const Inicio = ({ nombre, onChange, onStart }) => (
  <div className="inicio">
    <input
      type="text"
      placeholder="Escribe tu nombre"
      value={nombre}
      onChange={e => onChange(e.target.value)}
      maxLength={20}
    />
    <button onClick={onStart}>Jugar</button>
  </div>
);
export default Inicio;