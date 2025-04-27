import React, { useRef, useEffect } from 'react';
import Cabecera from '../components/Cabecera';

function Ping_Pong() {
  const canvasRef = useRef( null );

  useEffect( () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext( '2d' );

    // Tamaño del canvas
    canvas.width = 800;
    canvas.height = 400;

    // Elementos del juego
    let ball = { x: 400, y: 200, radius: 10, dx: 4, dy: 4 };
    let paddleWidth = 10, paddleHeight = 100;
    let leftPaddle = { x: 10, y: 150 };
    let rightPaddle = { x: 780, y: 150 };
    let upPressed = false, downPressed = false;

    // Movimiento del jugador (teclas)
    const keyDownHandler = ( e ) => {
      if ( e.key === 'ArrowUp' ) upPressed = true;
      if ( e.key === 'ArrowDown' ) downPressed = true;
    };

    const keyUpHandler = ( e ) => {
      if ( e.key === 'ArrowUp' ) upPressed = false;
      if ( e.key === 'ArrowDown' ) downPressed = false;
    };

    document.addEventListener( 'keydown', keyDownHandler );
    document.addEventListener( 'keyup', keyUpHandler );

    const draw = () => {
      ctx.clearRect( 0, 0, canvas.width, canvas.height );

      // Pelota
      ctx.beginPath();
      ctx.arc( ball.x, ball.y, ball.radius, 0, Math.PI * 2 );
      ctx.fillStyle = '#00f';
      ctx.fill();
      ctx.closePath();

      // Paletas
      ctx.fillStyle = '#000';
      ctx.fillRect( leftPaddle.x, leftPaddle.y, paddleWidth, paddleHeight );
      ctx.fillRect( rightPaddle.x, rightPaddle.y, paddleWidth, paddleHeight );

      // Movimiento de la paleta derecha (IA simple)
      if ( rightPaddle.y + paddleHeight / 2 < ball.y ) {
        rightPaddle.y += 4;
      } else {
        rightPaddle.y -= 4;
      }

      // Movimiento del jugador
      if ( upPressed && leftPaddle.y > 0 ) leftPaddle.y -= 6;
      if ( downPressed && leftPaddle.y < canvas.height - paddleHeight ) leftPaddle.y += 6;

      // Movimiento de la pelota
      ball.x += ball.dx;
      ball.y += ball.dy;

      // Rebote en eje Y
      if ( ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0 ) {
        ball.dy *= -1;
      }

      // Rebote con paletas
      if (
        ball.x - ball.radius < leftPaddle.x + paddleWidth &&
        ball.y > leftPaddle.y &&
        ball.y < leftPaddle.y + paddleHeight
      ) {
        ball.dx *= -1;
      }

      if (
        ball.x + ball.radius > rightPaddle.x &&
        ball.y > rightPaddle.y &&
        ball.y < rightPaddle.y + paddleHeight
      ) {
        ball.dx *= -1;
      }

      // Reinicio si la pelota se va fuera
      if ( ball.x < 0 || ball.x > canvas.width ) {
        ball.x = 400;
        ball.y = 200;
        ball.dx = 4 * ( Math.random() > 0.5 ? 1 : -1 );
        ball.dy = 4 * ( Math.random() > 0.5 ? 1 : -1 );
      }

      requestAnimationFrame( draw );
    };

    draw();

    // Cleanup
    return () => {
      document.removeEventListener( 'keydown', keyDownHandler );
      document.removeEventListener( 'keyup', keyUpHandler );
    };
  }, [] );

  return (
    <div>
      <Cabecera />
      <h1>Ping Pong</h1>
      <p>¡Usa las flechas ↑ y ↓ para mover tu paleta!</p>
      <canvas ref={ canvasRef } style={ { border: '2px solid black', display: 'block', margin: 'auto' } } />
    </div>
  );
}

export default Ping_Pong;
