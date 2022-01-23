import classNames from "classnames";
import { useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./App.css";

function App() {
  const [currentWord, setCurrentWord] = useState("");
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [attempts, setAttempts] = useState([]);
  const correctWord = "banco";

  const getLetter = (attempt, letterIndex) => {
    if (currentAttempt === attempt) {
      return currentWord[letterIndex];
    }

    return attempts[attempt]?.[letterIndex] || "";
  };

  const getLetterAlt = (attempt, letterIndex) => {
    const letter = getLetter(attempt, letterIndex);

    if (attempt >= currentAttempt) {
      return `Letra ${letterIndex + 1} de palabra ${attempt + 1}: ${
        letter || "vacía"
      }`;
    }

    if (letterIsCorrect(letter, letterIndex)) {
      return `La letra ${letter} es correcta en la posición ${letterIndex + 1}`;
    }

    if (wordHasLetter(letter)) {
      return `La letra ${letter} si está en la palabra`;
    }

    return `La letra ${letter} no está en la palabra`;
  };

  const getLetterClass = (attempt, letterIndex) => {
    const letter = getLetter(attempt, letterIndex);

    if (attempt >= currentAttempt) {
      return;
    }

    if (letterIsCorrect(letter, letterIndex)) {
      return "letter--correct";
    }

    if (wordHasLetter(letter)) {
      return "letter--present";
    }

    return "letter--not-present";
  };

  const getWordAlt = (attempt) => {
    if (attempt >= currentAttempt) {
      return `Palabra ${attempt + 1} vacía`;
    }

    return `Palabra ${attempt + 1}: ${attempts[attempt]}`;
  };

  const wordHasLetter = (letter) => {
    return correctWord.includes(letter);
  };

  const letterIsCorrect = (letter, position) => {
    return correctWord[position] === letter;
  };

  const onKeyPress = (key) => {
    if (key === "{enter}") {
      setCurrentAttempt(currentAttempt + 1);
      setAttempts([...attempts, currentWord]);
      setCurrentWord("");
      return;
    }

    setCurrentWord((word) => word + key);
  };

  return (
    <div className="App">
      <div className="grid">
        {[0, 1, 2, 3, 4, 5].map((attempt) => (
          <div
            className="word"
            key={attempt}
            role="row"
            aria-label={getWordAlt(attempt)}
          >
            {[0, 1, 2, 3, 4].map((letterIndex) => (
              <div
                className={classNames(
                  "letter",
                  getLetterClass(attempt, letterIndex)
                )}
                key={letterIndex}
                role="cell"
                aria-label={getLetterAlt(attempt, letterIndex)}
              >
                {getLetter(attempt, letterIndex)}
              </div>
            ))}
          </div>
        ))}
      </div>
      <Keyboard
        onKeyPress={onKeyPress}
        physicalKeyboardHighlight={true}
        physicalKeyboardHighlightPress={true}
      />
    </div>
  );
}

export default App;
