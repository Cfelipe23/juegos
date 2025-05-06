//representa una celda del tablero y cambia si estilo segun el tipo que reciba
import React from "react";
const Celda = ({ tipo }) => (
  <div className={`celda ${tipo}`} />
);
export default Celda;