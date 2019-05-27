import React from 'react'

type ChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => void

interface CellProps {
  row: number
  column: number
  value: string
  valid: boolean
  onchange: ChangeHandler
}

export const Cell: React.FunctionComponent<CellProps> = props => {
  // Builds the class list based off of position on board and whether it's valid
  const classList: string =
    'cell' +
    (props.column === 2 || props.column === 5 ? ' section-wall' : '') +
    (props.row === 2 || props.row === 5 ? ' section-floor' : '') +
    (!props.valid ? ' invalid' : '')

  return (
    <input
      type="text"
      className={classList}
      value={props.value}
      onChange={props.onchange}
    />
  )
}

export default Cell
