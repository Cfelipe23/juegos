import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cuadrado from './pages/JuegoCuadrado/Cuadrado';
import JuegodeMemoria from './pages/JuegoCartas/JuegodeMemoria';
import PingPong from './pages/JuegoPingPong/PingPong';
import JuegoSerpiente from './pages/Serpiente/JuegoSerpiente';


function App() {
  return (
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/Juegode_Cuadro" element={ <Cuadrado /> } />
      <Route path="/Juego_deMemoria" element={ <JuegodeMemoria /> } />
      <Route path="/PingPong" element={ <PingPong /> } />
      <Route path="/JuegoSerpiente" element={ <JuegoSerpiente /> } />
    </Routes>
  );
}

export default App;
