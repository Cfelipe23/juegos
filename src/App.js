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
      <Route path="/JuegodeCuadro" element={ <Cuadrado /> } />
      <Route path="/JuegodeMemoria" element={ <JuegodeMemoria /> } />
      <Route path="/JuegoPingPong" element={ <PingPong /> } />
      <Route path="/JuegoSerpiente" element={ <JuegoSerpiente /> } />
    </Routes>
  );
}

export default App;
