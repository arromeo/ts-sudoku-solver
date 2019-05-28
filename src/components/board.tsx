import React from 'react'
import { List, Map } from 'immutable'
import * as BlockHelpers from '../utils/blockHelpers'
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
            this.setState(
              ({ invalid }) => {
                return {
                  invalid: invalid.set('row', invalid.get('row').push(row)),
                }
              },
              () => {
                console.log('invalid row set')
              }
            )
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
            columnArr.push(testValue)
          } else {
            this.setState(
              ({ invalid }) => {
                return {
                  invalid: invalid.set(
                    'column',
                    invalid.get('column').push(column)
                  ),
                }
              },
              () => {
                console.log('invalid column set')
              }
            )
          }
        }
      }
    }

    // Block validation.
    for (let block = 0; block < 9; block++) {
      let blockArr: string[] = []
      for (let position = 0; position < 9; position++) {
        let row = BlockHelpers.blockToRow(block, position)
        let column = BlockHelpers.blockToColumn(block, position)
        let testValue = this.state.board.get(row).get(column)
        if (testValue !== '') {
          if (blockArr.includes(testValue) === false) {
            blockArr.push(testValue)
          } else {
            this.setState(
              ({ invalid }) => {
                return {
                  invalid: invalid.set(
                    'block',
                    invalid.get('block').push(block)
                  ),
                }
              },
              () => {
                console.log('invalid block set')
              }
            )
          }
        }
      }
    }
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
