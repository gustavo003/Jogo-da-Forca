import { useState, useCallback, useEffect } from "react";
import "./App.css";
import GameOver from "./components/GameOver";
import GamePage from "./components/GamePage";
import StartScreen from "./components/StartScreen";
import { wordsList } from "./data/words";

function App() {
  const stages = [
    {
      id: 1,
      name: "start",
    },
    {
      id: 2,
      name: "game",
    },
    { id: 3, name: "end" },
  ];

  const [stage, setStage] = useState(stages[0].name);

  const [wordCat, setWordCat] = useState([]);

  const [pontuacao, setPontuacao] = useState(0);
  const categories = Object.keys(wordsList);

  const selectWord = () => {
    if (wordCat[1]) {
      wordsList[wordCat[0]] = wordsList[wordCat[0]].filter((el) => {
        el != wordCat[1];
      });
    }

    const cat = categories[Math.floor(Math.random() * categories.length)];

    const values = wordsList[cat];
    const word = values[Math.floor(Math.random() * values.length)];

    setWordCat([cat, word.toUpperCase().split("")]);
  };

  const startGame = () => {
    selectWord();
    setStage(stages[1].name);
  };

  const gameOver = () => {
    setStage(stages[2].name);
  };

  const retry = () => {
    setStage(stages[0].name);

    setWordCat([]);

    setPontuacao(0);
  };

  return (
    <div className="App">
      {stage === "start" && <StartScreen startGame={startGame} />}
      {stage === "game" && (
        <GamePage
          wordCat={wordCat}
          gameOver={gameOver}
          selectWord={selectWord}
          score={[pontuacao, setPontuacao]}
        />
      )}
      {stage === "end" && <GameOver retry={retry} pontuacao={pontuacao} />}
    </div>
  );
}

export default App;
