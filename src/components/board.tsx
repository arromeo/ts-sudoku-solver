import React from 'react'
import { List } from 'immutable'
import Cell from './cell'

const initialState = {
  board: List([
    List(['', '', '', '', '', '', '', '', '']),
    List(['', '', '', '', '', '', '', '', '']),
    List(['', '', '', '', '', '', '', '', '']),
    List(['', '', '', '', '', '', '', '', '']),
    List(['', '', '', '', '', '', '', '', '']),
    List(['', '', '', '', '', '', '', '', '']),
    List(['', '', '', '', '', '', '', '', '']),
    List(['', '', '', '', '', '', '', '', '']),
    List(['', '', '', '', '', '', '', '', '']),
  ]),
}

type State = Readonly<typeof initialState>

export class InputBoard extends React.Component<object, State> {
  readonly state: State = initialState

  handleChange(
    event: React.ChangeEvent<HTMLInputElement>,
    row: number,
    column: number
  ) {
    console.log(event.target.value)
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
                    onchange={e =>
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
