import React from 'react';

const Menu = ({ onLevelSelect }) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🏓 Pin Pon Challenge</h1>
      <p style={styles.subtitle}>Selecciona el nivel:</p>
      <div style={styles.buttonGroup}>
        <button style={styles.button} onClick={() => onLevelSelect(2)}>Nivel 1: vs CPU</button>
        <button style={styles.button} onClick={() => onLevelSelect(3)}>Nivel 2: vs Jugador</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: '100px',
    color: 'white',
    backgroundColor: 'black',
    minHeight: '100vh'
  },
  title: {
    fontSize: '3rem',
    marginBottom: '20px',
  },
  subtitle: {
    fontSize: '1.5rem',
    marginBottom: '30px',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    alignItems: 'center',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1.2rem',
    backgroundColor: '#00ffcc',
    color: 'black',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    width: '220px'
  }
};

export default Menu;