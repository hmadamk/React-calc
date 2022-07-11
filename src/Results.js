import React from "react"
// Return the calculator result
function Result(props) {
  const { children } = props
  return (
    <div className="result">{children}</div>
  )
}
export default Result