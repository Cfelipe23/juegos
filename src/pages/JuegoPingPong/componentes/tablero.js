import React from 'react';

const tablero = ({ playerScore, cpuScore }) => {
  return (
    <div style={styles.container}>
      <div style={styles.score}>Jugador: {playerScore}</div>
      <div style={styles.score}>CPU: {cpuScore}</div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: '#222',
    padding: '10px',
    color: 'white',
    fontFamily: '"Press Start 2P", monospace',
  },
  score: {
    fontSize: '1.2rem',
  },
};

export default tablero;