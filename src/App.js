import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cuadrado from './pages/JuegoCuadrado/Cuadrado';
import JuegodeMemoria from './pages/JuegoCartas/JuegodeMemoria';
import PingPong from './pages/PingPong';
import Juego4 from './pages/Juego4';


function App() {
  return (
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/Juegode_Cuadro" element={ <Cuadrado /> } />
      <Route path="/Juego_deMemoria" element={ <JuegodeMemoria /> } />
      <Route path="/PingPong" element={ <PingPong /> } />
      <Route path="/Juego4" element={ <Juego4 /> } />
    </Routes>
  );
}

export default App;
