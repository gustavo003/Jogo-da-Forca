import React from "react";

function GameOver({ retry, pontuacao }) {
  return (
    <div>
      <h1>Fim de Jogo</h1>
      <p>Sua pontuação foi: {pontuacao}</p>
      <button onClick={retry}>Resetar o Jogo</button>
    </div>
  );
}

export default GameOver;
