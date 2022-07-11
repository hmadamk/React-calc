// take first operand then operation then secon operand and compute them
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
      return null
  }
}
//return numbers formated like 10000000 => 10,000,000;
function getNumber(number) {
  const stringNumber = number.toString()
  const integerDigits = parseFloat(stringNumber.split('.')[0])
  const decimalDigits = stringNumber.split('.')[1]
  const integerDisplay = integerDigits.toLocaleString('en', {
    maximumFractionDigits: 0
  })
  if (typeof foo === "undefined" && decimalDigits !== '') {
    return `${integerDisplay}.${decimalDigits}`
  }
  return integerDisplay

}
//reducer function that manipulate the states ands do the logic of the calculator
function reducer(state, action) {
  let value = state.result
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
        }
        return { ...state, result: -state.result, operand2: -state.result }
      }
      if (state.result === 0) {
        return { ...state, result: '-', operand1: '-' }
      } else if (state.result === '-') {
        return { ...state, result: 0, operand1: 0 }
      }
      return { ...state, result: -state.result, operand1: -state.result }

    case 'operator':
      if (state.operator !== '' && state.operand2 === '') {
        return { ...state, operator: action.value, result: '', operation: state.operand1 + action.value }
      }
      else if (state.operator !== '') {
        const res = compute(state.operand1, state.operator, state.operand2);
        return { ...state, result: '', operand1: res, operation: res + action.value, operand2: '', operator: action.value }
      }
      return { ...state, operator: action.value, result: '', operation: state.result + action.value, operand1: state.result }

    case 'number':
      if (state.result + action.value === '00') {
        return { ...state }
      }
      if (state.operator === '') {
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
        const res = compute(state.operand1, state.operator, state.operand2);
        return { ...state, result: res, operand1: '', operation: '', operator: '', operand2: '' }
      }
      return { ...state, operation: '', result: state.operand1, operator: '' }
    default:
      throw new Error(`${action.type} is not a valid action`);

  }
}
export { getNumber, compute, reducer };