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
  invalid: Map({
    row: List([]),
    column: List([]),
    block: List([]),
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
    this.setState(
      ({ board }) => {
        return {
          board: board.set(row, board.get(row).set(column, newValue)),
        }
      },
      () => {
        this.updateValidation()
      }
    )
  }

  updateValidation() {
    // Row validation.
    for (let row = 0; row < 9; row++) {
      let rowArr = this.state.board.get(row).toJS()
      for (let column = 0; column < 9; column++) {
        if (rowArr[column] !== '') {
          if (rowArr.indexOf(rowArr[column]) !== column) {
            console.log('invalid row')
          }
        }
      }
    }

    // Column validation.
    for (let column = 0; column < 9; column++) {
      let columnArr: string[] = []
      for (let row = 0; row < 9; row++) {
        let testValue = this.state.board.get(row).get(column)
        if (testValue !== '') {
          if (columnArr.includes(testValue) === false) {
            columnArr.push(this.state.board.get(row).get(column))
          } else {
            console.log('invalide column ')
          }
        }
      }
    }

    // Block validation.
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
