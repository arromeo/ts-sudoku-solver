import React from 'react'

interface CellProps {
  row: number
  column: number
  block: number
  value: string
  valid: boolean
}

export const Cell: React.FunctionComponent<CellProps> = props => {
  // Builds the class list based off of position on board and whether it's valid
  const classList: string =
    'cell' +
    (props.column === 2 || props.column === 5 ? ' section-wall' : '') +
    (props.row === 2 || props.row === 5 ? ' section-floor' : '') +
    (!props.valid ? ' invalid' : '')

  return <input type="text" className={classList} value={props.value} />
}

export default Cell
