import './App.css';
import { useState, useEffect } from 'react';

const btnList = [
  //Row 1
  { key: "clear", value: "AC" },
  { key: "divide", value: "/" },
  { key: "multiply", value: "x" },

  //Row 2
  { key: "seven", value: "7" },
  { key: "eight", value: "8" },
  { key: "nine", value: "9" },
  { key: "subtract", value: "-" },

  //Row 3
  { key: "four", value: "4" },
  { key: "five", value: "5" },
  { key: "six", value: "6" },
  { key: "add", value: "+" },

  //Row 4
  { key: "one", value: "1" },
  { key: "two", value: "2" },
  { key: "three", value: "3" },

  //Row 5
  { key: "zero", value: "0" },
  { key: "decimal", value: "." },
  { key: "equals", value: "=" }

];

function App() {

  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("0");
  const [value, setValue] = useState("");

  const handleOperation = (e) => {
    expression.includes("=") ?
      setExpression(result + e.target.value) :
      setExpression(value + expression.slice(0, -1) + e.target.value);
    setResult(e.target.value);
    setValue("");
  }

  const handleClick = (e) => {
    console.log(e.target.value);

    switch (e.target.value) {
      case "AC":
        setExpression("");
        setResult("0");
        setValue("");
        break;
      case "=":
        try {
          const calc = `${expression}${value}=`;
          const answer = eval((`${expression}${value}`).replace('x', '*'));
          setExpression(`${calc}${answer}`);
          setResult(answer);
          setValue("");
        } catch (err) {
          console.log(`Error: ${err}`);
          setResult("Err");
        }
        break;
      case "/":
      case "+":
      case "x":
        handleOperation(e);
        break;
      case "-":
        if (value === "" && expression === "") {
          setValue(`${value}${e.target.value}`);
          setResult(`${value}${e.target.value}`);
        } else {
          handleOperation(e);
        }
        break;
      case ".":
        if (value === "") {
          setValue("0.");
          setResult("0.");
        } else if (!value.includes(".")) {
          setValue(`${value}${e.target.value}`);
          setResult(`${value}${e.target.value}`);
        }
        break;
      case "0":
        if (value === "") {
          setResult("0");
        } else {
          setValue(`${value}${e.target.value}`);
          setResult(`${value}${e.target.value}`);
        }
        break;
      default:
        setValue(`${value}${e.target.value}`);
        setResult(`${value}${e.target.value}`);
        break;
    }
  }

  return (
    <div className="App">
      <div className="calculator">
        <div className="display-container">
          <span className='display-upper'>{expression}</span>
          <span id='display'>{result}</span>
        </div>
        <div className="button-container">
          {btnList.map((btn) => {
            return (
              <button
                id={btn.key}
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
