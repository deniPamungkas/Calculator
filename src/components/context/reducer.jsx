const ACTIONS = {
  ADD_DIGIT: "add-digit",
  DELETE: "delete-digit",
  EVALUATE: "evaluate",
  CLEAR: "clear",
  CHOOSE_OPERATION: "choose-operation",
};

const evaluate = (e) => {
  let hasil;
  switch (e.operation) {
    case "+":
      return (hasil =
        parseFloat(e.previousOperand) + parseFloat(e.currentOperand));
    case "-":
      return (hasil =
        parseFloat(e.previousOperand) - parseFloat(e.currentOperand));
    case "x":
      return (hasil =
        parseFloat(e.previousOperand) * parseFloat(e.currentOperand));

    case "/":
      return (hasil =
        parseFloat(e.previousOperand) / parseFloat(e.currentOperand));
    case "%":
      return (hasil =
        parseFloat(e.previousOperand) % parseFloat(e.currentOperand));
  }
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_DIGIT":
      if (state.overwrite) { 
        return {
          ...state,
          currentOperand: action.payload.digit,
          overwrite: false,
        };
      }
      if (state.currentOperand === "0" && action.payload.digit === 0)
        return state;
      if (state.currentOperand.includes(".") && action.payload.digit === ".")
        return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand}${action.payload.digit}`,
      };
    case "CLEAR":
      return { currentOperand: "", previousOperand: "", operation: "" };
    case "DELETE":
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: "",
        };
      }
      return {
        ...state,
        currentOperand: state.currentOperand.replace(
          state.currentOperand.charAt(state.currentOperand.length - 1),
          ""
        ),
      };
    case "ADD_OPERATION":
      if (state.currentOperand == "" && state.previousOperand == "")
        return state;
      if (state.currentOperand == "" && state.previousOperand !== "")
        return {
          ...state,
          operation: action.payload,
        };
      if (state.currentOperand !== "" && state.previousOperand == "")
        return {
          operation: action.payload,
          currentOperand: "",
          previousOperand: state.currentOperand,
        };
      if (state.currentOperand !== "" && state.previousOperand !== "")
        return {
          operation: action.payload,
          previousOperand: evaluate(state),
          currentOperand: "",
        };
    case "EVALUATE":
      if (
        state.operation == "" ||
        state.currentOperand == "" ||
        state.previousOperand == ""
      )
        return state;
      return {
        currentOperand: evaluate(state).toString(),
        previousOperand: "",
        operation: "",
        overwrite: true,
      };
  }
};
