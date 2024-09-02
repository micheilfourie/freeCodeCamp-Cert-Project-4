import './App.css';
import { useState } from 'react';

const btnList = [
  //Row 1
  { key: "clear", value: "AC" },
  { key: "divide", value: "/" },
  { key: "multiply", value: "x" },

  //Row 2
  { key: "seven", value: "7" },
  { key: "eight", value: "8" },
  { key: "nine", value: "9" },
  { key: "minus", value: "-" },

  //Row 3
  { key: "four", value: "4" },
  { key: "five", value: "5" },
  { key: "six", value: "6" },
  { key: "plus", value: "+" },

  //Row 4
  { key: "one", value: "1" },
  { key: "two", value: "2" },
  { key: "three", value: "3" },

  //Row 5
  { key: "zero", value: "0" },
  { key: "decimal", value: "." },
  { key: "equals", value: "=" }

];

const operatorList = ["/", "+", "-", "x"];

function App() {

  const [displayUpper, setDisplayUpper] = useState("");
  const [displayLower, setDisplayLower] = useState("0");
  const [value, setValue] = useState("");

  const handleClick = (e) => {
    console.log(e.target.value);

    const operatorPresent = () => {
      return !operatorList.includes(value.charAt(value.length - 1));
    }

    const insertOperator = (e) => {
      const operator = e.target.value;

      if (operator === "x") {
        setDisplayUpper(value + "*");
      } else {
        setDisplayUpper(value + operator);
      }
      setDisplayLower(operator);
      setValue("");
    }

    const evaluate = () => {
      if (operatorPresent()) {
        setDisplayUpper(displayUpper + value + "=" + eval(displayUpper + value));
        setValue("");
        setDisplayLower("0");
      }
    }

    const clear = () => {
      setDisplayUpper("");
      setDisplayLower("0");
      setValue("");
    }

    switch (e.target.value) {
      case "AC":
        clear();
        break;
      case "=":
        evaluate();
        break;
      case "/", "+", "-", "x":
        insertOperator(e);
        break;
      default:
        setValue(value + e.target.value);
        setDisplayLower(value + e.target.value);
        break;
    }
  }

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          <span className='display-upper'>{displayUpper}</span>
          <span className='display-lower'>{displayLower}</span>
        </div>
        <div className="button-container">
          {btnList.map((btn) => {
            return (
              <button
                className={btn.key}
                key={btn.key}
                value={btn.value}
                onClick={(e) => { handleClick(e) }}>
                {btn.value}
              </button>)
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
