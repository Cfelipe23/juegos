import React, { useEffect, useRef, useState } from 'react';

function Game({ modo, onBackToMenu }) {
  const canvasRef = useRef(null);
  const playerPos = useRef({ x: 200, y: 550 });
  const cpuPos = useRef({ x: 200, y: 50 });
  const ball = useRef({ x: 200, y: 300, dx: 0, dy: 0 });
  const animationRef = useRef(null);
  const keysPressed = useRef({});
  const playerScore = useRef(0);
  const cpuScore = useRef(0);
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [isCounting, setIsCounting] = useState(true);

  const width = 400;
  const height = 600;

  const resetPositions = () => {
    playerPos.current = { x: 200, y: 550 };
    cpuPos.current = { x: 200, y: 50 };
    ball.current = { x: 200, y: 300, dx: 0, dy: 0 };
    setCountdown(3);
    setIsCounting(true);
  };

  const resetBall = () => {
    ball.current = {
      x: width / 2,
      y: height / 2,
      dx: 2 * (Math.random() > 0.5 ? 1 : -1),
      dy: 3 * (Math.random() > 0.5 ? 1 : -1),
    };
  };

  const resetGame = () => {
    playerScore.current = 0;
    cpuScore.current = 0;
    setGameOver(false);
    setMessage('');
    resetPositions();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isCounting) {
        setCountdown((prev) => {
          if (prev <= 1) {
            resetBall();
            setIsCounting(false);
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isCounting]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

    const handleKeyDown = (e) => {
      keysPressed.current[e.key.toLowerCase()] = true;
    };

    const handleKeyUp = (e) => {
      keysPressed.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = '#111';
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = '#888';
      ctx.setLineDash([10, 15]);
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Jugadores
      ctx.fillStyle = 'lime';
      ctx.beginPath();
      ctx.arc(playerPos.current.x, playerPos.current.y, 25, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'crimson';
      ctx.beginPath();
      ctx.arc(cpuPos.current.x, cpuPos.current.y, 25, 0, Math.PI * 2);
      ctx.fill();

      // Pelota
      ctx.fillStyle = 'gold';
      ctx.beginPath();
      ctx.arc(ball.current.x, ball.current.y, 10, 0, Math.PI * 2);
      ctx.fill();

      // Puntajes
      ctx.fillStyle = 'cyan';
      ctx.font = 'bold 16px "Press Start 2P", monospace';
      ctx.fillText(`Jugador: ${playerScore.current}`, 10, height - 20);
      ctx.fillText(`${modo === 'cpu' ? 'CPU' : 'Jugador 2'}: ${cpuScore.current}`, 10, 30);

      // Mensajes
      if (message) {
        ctx.fillStyle = 'magenta';
        ctx.font = 'bold 22px "Press Start 2P", monospace';
        ctx.fillText(message, 30, height / 2 - 10);
      }

      // Cuenta regresiva
      if (isCounting && countdown > 0) {
        ctx.fillStyle = 'white';
        ctx.font = 'bold 50px "Press Start 2P", monospace';
        ctx.fillText(countdown.toString(), width / 2 - 20, height / 2);
      }
    };

    const update = () => {
      if (gameOver || isCounting) return;

      const p = playerPos.current;
      const c = cpuPos.current;
      const b = ball.current;

      const speed = 5;

      // Jugador 1
      if (keysPressed.current['arrowleft'] && p.x > 25) p.x -= speed;
      if (keysPressed.current['arrowright'] && p.x < width - 25) p.x += speed;
      if (keysPressed.current['arrowup'] && p.y > height / 2 + 25) p.y -= speed;
      if (keysPressed.current['arrowdown'] && p.y < height - 25) p.y += speed;

      if (modo === 'cpu') {
        const cpuSpeed = 2;
        if (c.x < b.x - 2) c.x += cpuSpeed;
        else if (c.x > b.x + 2) c.x -= cpuSpeed;
        if (c.y < b.y - 2) c.y += cpuSpeed;
        else if (c.y > b.y + 2) c.y -= cpuSpeed;
        c.y = Math.max(25, Math.min(height / 2 - 25, c.y));
      } else {
        const speed2 = 5;
        if (keysPressed.current['a'] && c.x > 25) c.x -= speed2;
        if (keysPressed.current['d'] && c.x < width - 25) c.x += speed2;
        if (keysPressed.current['w'] && c.y > 25) c.y -= speed2;
        if (keysPressed.current['s'] && c.y < height / 2 - 25) c.y += speed2;
      }

      // Movimiento de la pelota
      b.x += b.dx;
      b.y += b.dy;

      if (b.x <= 10 || b.x >= width - 10) b.dx *= -1;

      const distToPlayer = Math.hypot(b.x - p.x, b.y - p.y);
      if (distToPlayer < 35 && b.dy > 0) {
        b.dy *= -1;
        b.dx += (b.x - p.x) * 0.05;
        setMessage('¡GOL!');
      }

      const distToCPU = Math.hypot(b.x - c.x, b.y - c.y);
      if (distToCPU < 35 && b.dy < 0) {
        b.dy *= -1;
        b.dx += (b.x - c.x) * 0.05;
        setMessage('¡GOL!');
      }

      if (b.y <= 0) {
        playerScore.current += 1;
        setMessage('¡GOL DEL JUGADOR!');
        resetPositions();
      } else if (b.y >= height) {
        cpuScore.current += 1;
        setMessage(modo === 'cpu' ? '¡GOL DE LA CPU!' : '¡GOL DEL JUGADOR 2!');
        resetPositions();
      }

      if (playerScore.current >= 5) {
        setMessage('🎉 ¡GANASTE! 🎉');
        setGameOver(true);
      } else if (cpuScore.current >= 5) {
        setMessage('💀 ¡PERDISTE! 💀');
        setGameOver(true);
      }
    };

    const loop = () => {
      update();
      draw();
      animationRef.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationRef.current);
    };
  }, [gameOver, isCounting]);

  return (
    <div style={{ textAlign: 'center', fontFamily: '"Press Start 2P", monospace' }}>
      <h1 style={{ color: 'cyan', fontSize: '24px' }}>🎮 Pong Arcade 🎮</h1>
      <canvas
        ref={canvasRef}
        style={{ border: '4px solid cyan', backgroundColor: '#111' }}
      />
      <div style={{ marginTop: '20px' }}>
        {gameOver && (
          <button onClick={resetGame} style={buttonStyle}>
            Reiniciar Juego
          </button>
        )}
        <button onClick={onBackToMenu} style={{ ...buttonStyle, backgroundColor: 'crimson' }}>
          Volver al Menú
        </button>
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  fontWeight: 'bold',
  backgroundColor: 'magenta',
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
  margin: '10px',
};

export default Game;