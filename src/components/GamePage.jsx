import React, { useEffect, useState } from "react";
import { wordsList } from "../data/words";
import "./GamePage.css";
function GamePage({ wordCat, gameOver, score, selectWord }) {
  const [category, word] = wordCat;

  const [pontuacao, setPontuacao] = score;

  const [guessed, setGuessed] = useState("");

  const [wrong, setWrong] = useState([]);

  const [right, setRight] = useState([]);

  const [tentativas, setTentativas] = useState(word.length - 1);

  const verifyLetter = () => {
    if (!word.includes(guessed)) {
      if (!wrong.includes(guessed)) {
        setWrong([...wrong, guessed]);

        setTentativas(tentativas - 1);
      }

      return;
    }
    if (!right.includes(guessed)) setRight([...right, guessed]);
  };

  useEffect(() => {
    if (tentativas <= 0) {
      gameOver();
    }
  }, [tentativas]);

  useEffect(() => {
    if (new Set(word).size === right.length) {
      setPontuacao(pontuacao + 1);
      setRight([]);
      setWrong([]);
      selectWord();
    }
  }, [right]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log(wrong);
      verifyLetter();
    }
  };

  return (
    <div onKeyDown={handleKeyDown}>
      <h1>Advinhe a palavra</h1>
      <h3>
        Dica sobre a palavra: <span className="category">{category}</span>
      </h3>
      <p>Você ainda tem {tentativas} tentativa(s)</p>
      <div className="words">
        {word.map((l) => {
          return <div className="square">{right.includes(l) && l}</div>;
        })}
      </div>
      {pontuacao > 0 && (
        <div>
          Sua pontuação: <span style={{ fontWeight: "bold" }}>{pontuacao}</span>
        </div>
      )}
      <p>Tente advinhar uma letra</p>
      <input
        required
        maxLength={1}
        onChange={(e) => setGuessed(e.target.value.toUpperCase())}
        className="input_letter"
        type="text"
      />
      <button className="button_play" onClick={verifyLetter}>
        Jogar
      </button>
      <p>Letras já utilizadas:</p>

      {wrong.map((wr) => {
        return <span>{wr}, </span>;
      })}
    </div>
  );
}

export default GamePage;
