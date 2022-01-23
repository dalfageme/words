import classNames from "classnames";
import { useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import words from "../data/words";
import "./App.css";

const getTodayWord = () => {
  const today = new Date();
  const yearCount = today.getFullYear() - 2022;
  const dayOfYear = Math.floor(
    (today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
  );
  const wordIndex = yearCount * 1000 + dayOfYear;

  return [...words][wordIndex].toLowerCase();
};

function App() {
  const [currentWord, setCurrentWord] = useState("");
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [attempts, setAttempts] = useState([]);
  const [alert, setAlert] = useState();

  const correctWord = getTodayWord();

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
      enterWord(currentWord);
      return;
    }

    if (key === "{bksp}") {
      deleteLastLetter();
      return;
    }

    if (currentWord.length < 5) {
      setCurrentWord((word) => word + key);
    }
  };

  const deleteLastLetter = () => {
    setCurrentWord((word) => word.slice(0, -1));
  };

  const enterWord = (word) => {
    if (correctWord === word) {
      setAlert(`Palabra acertada: ${word}`);
    }

    if (!words.has(word)) {
      setAlert(`${word} no está en el diccionario`);
      return;
    }

    setCurrentAttempt(currentAttempt + 1);
    setAttempts([...attempts, currentWord]);
    setCurrentWord("");
    return;
  };

  return (
    <div className="App">
      {alert && <div role="alert">{alert}</div>}
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
        layout={{
          default: [
            "q w e r t y u i o p",
            "a s d f g h j k l ñ",
            "{enter} z x c v b n m {bksp}",
          ],
        }}
        display={{
          "{bksp}": "<",
          "{enter}": "ENTER",
        }}
      />
    </div>
  );
}

export default App;
