// Start my calculator app
import React from "react"
const initialState = { operand1: 0, operand2: '', result: 0, operator: '', operation: '' }
function compute(op1, operate, op2) {
  const prev = parseFloat(op1)
  const curr = parseFloat(op2)
  switch (operate) {
    case '+':
      return prev + curr
    case '-':
      return prev - curr
    case 'x':
      return prev * curr
    case '÷':
      return prev / curr
    case '%':
      return prev % curr
    default:
      return
  }
}
function getNumber(number) {
  const stringNumber = number.toString()
  const integerDigits = parseFloat(stringNumber.split('.')[0])
  const decimalDigits = stringNumber.split('.')[1]
  let integerDisplay
  if (isNaN(integerDigits)) {
    integerDisplay = ''
  } else {
    integerDisplay = integerDigits.toLocaleString('en', {
      maximumFractionDigits: 0
    })
  }
  if (decimalDigits != null) {
    return `${integerDisplay}.${decimalDigits}`
  } else {
    return integerDisplay
  }

}
export default function App() {
  return (
    <div className="container">
      <Calc />
    </div>
  )
}
function Result(props) {
  return (
    <div className="result">{props.children}</div>
  )
}
function Calc() {
  function reducer(state, action) {
    switch (action.type) {
      case 'init':
        return state;
      case 'clear':
        return { ...state, result: 0, operator: '' };
      case 'flip-sign':
        if (state.operator !== '') {
          if (state.result === '') {
            return { ...state, result: '-', operand2: '-' }
          } else if (state.result === '-') {
            return { ...state, result: '', operand2: '' }
          } else {
            return { ...state, result: -state.result, operand2: -state.result }
          }
        } else {
          if (state.result === 0) {
            return { ...state, result: '-', operand1: '-' }
          } else if (state.result === '-') {
            return { ...state, result: 0, operand1: 0 }
          } else {
            return { ...state, result: -state.result, operand1: -state.result }
          }
        }
      case 'operator':
        if (state.operator !== '' && state.operand2 === '') {
          console.log(2);
          return { ...state, operator: action.value, result: '', operation: state.operand1 + action.value }
        }
        else if (state.operator !== '') {
          console.log(1);
          let res = compute(state.operand1, state.operator, state.operand2);
          return { ...state, result: '', operand1: res, operation: res + action.value, operand2: '', operator: action.value }
        } else {
          console.log(3);
          return { ...state, operator: action.value, result: '', operation: state.result + action.value, operand1: state.result }
        }
      case 'number':
        let value
        if (state.operator === '') {

          if (state.operand1 !== state.result)
            if (state.result !== state.operand1) {
              return { ...state, result: action.value, operand1: action.value }
            }
          if (state.result === 0) { value = action.value } else {

            if (String(state.result).length >= 10) {
              value = state.result
            } else {
              value = state.result + action.value
            }
          }
          return { ...state, result: value, operand1: value }
        }
        if (String(state.result).length >= 10) {
          value = state.result
        } else {
          value = state.result + action.value
        }
        return { ...state, result: value, operand2: value }

      case 'equal':
        if (state.operator !== '' && state.operand2 !== '') {
          let res = compute(state.operand1, state.operator, state.operand2);
          return { ...state, result: res, operand1: '', operation: '', operator: '', operand2: '' }
        }
        return { ...state, operation: '', result: state.operand1, operator: '' }
      default:
        throw new Error(`${action.type} is not a valid action`);

    }
  }
  const [{ operand1, operand2, result, operator, operation }, dispatch] = React.useReducer(reducer, initialState)
  console.log(operator);
  React.useEffect(() => {
    dispatch({ type: 'init' });
  }, []);
  return (
    <>
      <Result ><span className="op">{operation}</span>{result >= 1000 ? getNumber(result) : result}</Result>
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