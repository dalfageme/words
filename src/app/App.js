import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      {[0, 1, 2, 3, 4, 5].map((attempt) => (
        <div
          className="word"
          key={attempt}
          role="row"
          aria-label={`Palabra ${attempt + 1} vacía`}
        >
          {[0, 1, 2, 3, 4, 5].map((letterIndex) => (
            <div
              className="letter"
              key={letterIndex}
              role="cell"
              aria-label={`Letra ${letterIndex + 1} de palabra ${
                attempt + 1
              } vacía`}
            ></div>
          ))}
        </div>
      ))}
      <Keyboard />
    </div>
  );
}

export default App;
