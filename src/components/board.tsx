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

  render() {
    return (
      <div className="board">
        {this.state.board.map((row, rowNumber) => {
          return (
            <div className="row">
              {row.map((cell, cellNumber) => {
                return (
                  <Cell
                    key={rowNumber + '-' + cellNumber}
                    row={rowNumber}
                    column={cellNumber}
                    block={1}
                    value={cell}
                    valid={true}
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
