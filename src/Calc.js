import React, { useCallback, useEffect, useReducer } from "react";
import { getNumber, reducer } from "./functions";
import Result from "./Results";
//initial state of the app
const initialState = { operand1: 0, operand2: '', result: 0, operator: '', operation: '' }
// Calc component that return the whole Calculator
function Calc() {
  const [{ result, operation }, dispatch] = useReducer(reducer, initialState)
  const myDispatch = useCallback((e) => dispatch({ type: e.target.getAttribute('data-action'), value: e.target.innerText }), [])
  useEffect(() => {
    dispatch({ type: 'init' });
  }, []);
  return (
    <>
      <Result><span className="op">{operation}</span>{result >= 1000 ? getNumber(result) : result}</Result>
      <div className="calc">
        <button type="button" data-action="clear" onClick={myDispatch}>AC</button>
        <button type="button" data-action="flip-sign" onClick={myDispatch}>+/-</button>
        <button type="button" data-action="operator" onClick={myDispatch}>%</button>
        <button type="button" data-action="operator" onClick={myDispatch}>÷</button>
        <button type="button" data-action="number" onClick={myDispatch}>7</button>
        <button type="button" data-action="number" onClick={myDispatch}>8</button>
        <button type="button" data-action="number" onClick={myDispatch}>9</button>
        <button type="button" data-action="operator" onClick={myDispatch}>x</button>
        <button type="button" data-action="number" onClick={myDispatch}>4</button>
        <button type="button" data-action="number" onClick={myDispatch}>5</button>
        <button type="button" data-action="number" onClick={myDispatch}>6</button>
        <button type="button" data-action="operator" onClick={myDispatch}>-</button>
        <button type="button" data-action="number" onClick={myDispatch}>1</button>
        <button type="button" data-action="number" onClick={myDispatch}>2</button>
        <button type="button" data-action="number" onClick={myDispatch}>3</button>
        <button type="button" data-action="operator" onClick={myDispatch}>+</button>
        <button type="button" data-action="number" onClick={myDispatch} className="big">0</button>
        <button type="button" data-action="number" onClick={myDispatch}>.</button>
        <button type="button" data-action="equal" onClick={myDispatch}>=</button>
      </div></>
  )
}
export default Calc