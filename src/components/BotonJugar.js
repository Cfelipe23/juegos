import React from 'react';
import { useNavigate } from 'react-router-dom';

function PlayButton( { path } ) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate( path );
  };

  return (
    <button className="play-btn" onClick={ handleClick }>
      Play
    </button>
  );
}

export default PlayButton;
