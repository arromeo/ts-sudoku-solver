import React from 'react'
import { List, Map } from 'immutable'
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
  validation: Map({
    row: List([
      List([]),
      List([]),
      List([]),
      List([]),
      List([]),
      List([]),
      List([]),
      List([]),
      List([]),
    ]),
    column: List([
      List([]),
      List([]),
      List([]),
      List([]),
      List([]),
      List([]),
      List([]),
      List([]),
      List([]),
    ]),
    block: List([
      List([]),
      List([]),
      List([]),
      List([]),
      List([]),
      List([]),
      List([]),
      List([]),
      List([]),
    ]),
  }),
}

type State = Readonly<typeof initialState>

export class InputBoard extends React.Component<object, State> {
  readonly state: State = initialState

  handleChange(
    event: React.ChangeEvent<HTMLInputElement>,
    row: number,
    column: number
  ) {
    // Limits how inputs are handled. Typing a number in an already occupied
    // cell replaces it with that number. Typing a non-number deletes what's
    // in the cell
    const validCharacters = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    let newValue: string
    if (event.target.value.charAt(1)) {
      newValue = validCharacters.includes(event.target.value.charAt(1))
        ? event.target.value.charAt(1)
        : ''
    } else {
      newValue = validCharacters.includes(event.target.value.charAt(0))
        ? event.target.value.charAt(0)
        : ''
    }

    //TODO: board.get(row) is failing TypeScript compiling with strictNullChecks
    //      activated. Figure out how to set it up correctly so it can be turned
    //      back on.
    this.setState(({ board }) => {
      return {
        board: board.set(row, board.get(row).set(column, newValue)),
      }
    })
  }

  render() {
    return (
      <form className="board">
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
      </form>
    )
  }
}

export default InputBoard
