import React from 'react'

import Cell from './cell'

function boardGenerator(): string[][] {
  let board: string[][] = []
  for (let row = 0; row < 9; row++) {
    board.push([])
    for (let cell = 0; cell < 9; cell++) {
      board[row].push('')
    }
  }

  return board
}

const initialState = {
  board: boardGenerator(),
}

type State = Readonly<typeof initialState>

export class InputBoard extends React.Component<object, State> {
  readonly state: State = initialState

  handleChange(
    event: React.ChangeEvent,
    row: number | undefined,
    column: number | undefined
  ) {

    console.log('Attempting to change row ' + row + ' column ' + column)
  }

  render() {
    return (
      <div className="board">
        {this.state.board.map((row, rowNumber) => {
          return (
            <div key={rowNumber} className="row">
              {row.map((value, columnNumber) => {
                return (
                  <Cell
                    key={rowNumber + '-' + columnNumber}
                    row={rowNumber}
                    column={columnNumber}
                    value={value}
                    valid={true}
                    onchange={(e) =>
                      this.handleChange(e, rowNumber, columnNumber)
                    }
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }
}

export default InputBoard
