import React from "react";
import Result from "./Results";
import { getNumber, reducer } from "./functions";
//initial state of the app
const initialState = { operand1: 0, operand2: '', result: 0, operator: '', operation: '' }
// Calc component that return the whole Calculator
function Calc() {
  const [{ result, operation }, dispatch] = React.useReducer(reducer, initialState)
  React.useEffect(() => {
    dispatch({ type: 'init' });
  }, []);
  return (
    <>
      <Result><span className="op">{operation}</span>{result >= 1000 ? getNumber(result) : result}</Result>
      <div className="calc">
        <button type="button" onClick={e => dispatch({ type: 'clear', value: e.target.innerText })}>AC</button>
        <button type="button" onClick={e => dispatch({ type: 'flip-sign', value: e.target.innerText })}>+/-</button>
        <button type="button" onClick={e => dispatch({ type: 'operator', value: e.target.innerText })}>%</button>
        <button type="button" onClick={e => dispatch({ type: 'operator', value: e.target.innerText })}>÷</button>
        <button type="button" onClick={e => dispatch({ type: 'number', value: e.target.innerText })}>7</button>
        <button type="button" onClick={e => dispatch({ type: 'number', value: e.target.innerText })}>8</button>
        <button type="button" onClick={e => dispatch({ type: 'number', value: e.target.innerText })}>9</button>
        <button type="button" onClick={e => dispatch({ type: 'operator', value: e.target.innerText })}>x</button>
        <button type="button" onClick={e => dispatch({ type: 'number', value: e.target.innerText })}>4</button>
        <button type="button" onClick={e => dispatch({ type: 'number', value: e.target.innerText })}>5</button>
        <button type="button" onClick={e => dispatch({ type: 'number', value: e.target.innerText })}>6</button>
        <button type="button" onClick={e => dispatch({ type: 'operator', value: e.target.innerText })}>-</button>
        <button type="button" onClick={e => dispatch({ type: 'number', value: e.target.innerText })}>1</button>
        <button type="button" onClick={e => dispatch({ type: 'number', value: e.target.innerText })}>2</button>
        <button type="button" onClick={e => dispatch({ type: 'number', value: e.target.innerText })}>3</button>
        <button type="button" onClick={e => dispatch({ type: 'operator', value: e.target.innerText })}>+</button>
        <button type="button" onClick={e => dispatch({ type: 'number', value: e.target.innerText })} className="big">0</button>
        <button type="button" onClick={e => dispatch({ type: 'number', value: e.target.innerText })}>.</button>
        <button type="button" onClick={e => dispatch({ type: 'equal', value: e.target.innerText })}>=</button>
      </div></>
  )
}
export default Calc