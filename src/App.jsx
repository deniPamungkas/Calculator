import { useContext, useEffect, useReducer, useState } from "react";
import "./App.scss";
import { Button } from "./components/AllComps";
import { SetThemeContext, ThemeContext } from "./components/context/context";
import { reducer } from "./components/context/reducer";

const ACTIONS = {
  ADD_DIGIT: "add-digit",
  DELETE: "delete-digit",
  EVALUATE: "evaluate",
  CLEAR: "clear",
  CHOOSE_OPERATION: "choose-operation",
};

function App() {
  const context = useContext(ThemeContext);
  const setTheme = useContext(SetThemeContext);

  const red = {
    currentOperand: "",
    previousOperand: "",
    operation: "",
  };

  const [state, dispatch] = useReducer(reducer, red);

  const body = document.getElementById("root").parentElement;
  useEffect(() => {
    body.classList.toggle("nightMode");
  }, [context]);

  const setNightMode = () => {
    if (context) {
      return "nightMode";
    } else {
      return "";
    }
  };

  const number = [
    "AC",
    "DEL",
    "%",
    "/",
    1,
    2,
    3,
    "x",
    4,
    5,
    6,
    "-",
    7,
    8,
    9,
    "+",
  ];
  const operation = ["%", "/", "x", "+", "-"];
  const numberOrange = [3, 7, 11, 15];

  console.log(state);

  return (
    <main className={`App ${setNightMode()}`}>
      <button
        className={`nightModeToggle btn ${setNightMode()}`}
        onClick={setTheme}
      >
        {context ? "Go Bright" : "Go Dark"}
      </button>
      <section className={`screen ${setNightMode()}`}>
        <div className="previousOperand">
          {state.previousOperand} {state.operation}
        </div>
        <div className="currentOperand">{state.currentOperand}</div>
      </section>
      <section id="button">
        {number.map((res, index) => {
          return (
            <Button
              key={index}
              className={numberOrange.includes(index) ? "orange" : ""}
              action={() => {
                if (typeof res == "number") {
                  return dispatch({
                    type: "ADD_DIGIT",
                    payload: { digit: res },
                  });
                } else if (res === "AC") {
                  return dispatch({ type: "CLEAR" });
                } else if (res === "DEL") {
                  return dispatch({ type: "DELETE" });
                } else if (operation.includes(res)) {
                  return dispatch({ type: "ADD_OPERATION", payload: res });
                }
              }}
            >
              {res}
            </Button>
          );
        })}
      </section>
      <section id="button2">
        <Button
          className={`lg`}
          action={() => {
            dispatch({ type: "ADD_DIGIT", payload: { digit: 0 } });
          }}
        >
          0
        </Button>
        <Button
          action={() => {
            dispatch({ type: "ADD_DIGIT", payload: { digit: "." } });
          }}
        >
          .
        </Button>
        <Button
          action={() => {
            dispatch({ type: "EVALUATE" });
          }}
          className={`orange`}
        >
          =
        </Button>
      </section>
    </main>
  );
}

export default App;
