import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';

function Header() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate( '/' );
  };

  return (
    <header className="header">
      <button
        onClick={ handleClick }
        className="header-button">
        Arkade
      </button>
    </header>
  );
}

export default Header;