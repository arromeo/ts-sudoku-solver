import React from 'react'
import { List, Map, Set, fromJS } from 'immutable'
import * as BlockHelpers from '../utils/blockHelpers'
import Cell from './cell'
import { SudokuSolver } from '../SudokuSolver/SudokuSolver'

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
    row: Set([]),
    column: Set([]),
    block: Set([]),
  }),
  isValid: false,
  errorMessage: '',
}

type State = Readonly<typeof initialState>

export class InputBoard extends React.Component<object, State> {
  readonly state: State = initialState

  handleChange(event: React.ChangeEvent<HTMLInputElement>, row: number, column: number) {
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

  handleSubmit(event: React.FormEvent): void {
    event.preventDefault()
    const solver = new SudokuSolver()
    const solved = solver.solve(this.state.board.toJS())
    if (typeof solved === 'string') {
      this.setState({ errorMessage: solved })
    } else {
      this.setState({
        board: fromJS(solved),
      })
    }
  }

  updateValidation(): void {
    // Resets the invalid rows, columns and blocks for revalidation
    this.setState({
      invalid: fromJS(initialState.invalid),
      isValid: true,
      errorMessage: '',
    })

    // 17 Clue Validation - This makes sure there are at least 17 clues
    {
      let clueTotal = 0
      for (let row = 0; row < 9; row++) {
        for (let column = 0; column < 9; column++) {
          if (this.state.board.get(row).get(column) !== '') {
            clueTotal++
          }
        }
      }
      if (clueTotal < 17) {
        this.setState({
          isValid: false,
          errorMessage: 'Board needs at least 17 clues',
        })
      }
    }

    // Row validation.
    for (let row = 0; row < 9; row++) {
      let rowArr = this.state.board.get(row).toJS()
      for (let column = 0; column < 9; column++) {
        if (rowArr[column] !== '') {
          if (rowArr.indexOf(rowArr[column]) !== column) {
            this.setState(({ invalid }) => {
              return {
                invalid: invalid.set('row', invalid.get('row').add(row)),
                isValid: false,
              }
            })
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
            this.setState(({ invalid }) => {
              return {
                invalid: invalid.set('column', invalid.get('column').add(column)),
                isValid: false,
              }
            })
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
            this.setState(({ invalid }) => {
              return {
                invalid: invalid.set('block', invalid.get('block').add(block)),
                isValid: false,
              }
            })
          }
        }
      }
    }
  }

  // Returns whether the cell is valid
  isCellValid(row: number, column: number): boolean {
    return (
      !this.state.invalid.get('row').includes(row) &&
      !this.state.invalid.get('column').includes(column) &&
      !this.state.invalid.get('block').includes(BlockHelpers.positionToBlock(row, column))
    )
  }

  //Clears the board
  handleClear(event: React.MouseEvent): void {
    event.preventDefault()
    this.setState({
      board: fromJS(initialState.board),
    })
  }

  render() {
    return (
      <div className="board-container">
        <h1 className="title">TypeScript Sudoku Solver</h1>
        <form className="board" onSubmit={e => this.handleSubmit(e)}>
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
                      valid={this.isCellValid(rowNumber, columnNumber)}
                      onchange={e => this.handleChange(e, rowNumber, columnNumber)}
                    />
                  )
                })}
              </div>
            )
          })}
          <div className="error">{this.state.errorMessage}</div>
          <div className="button-container">
            <button className="button" type="submit" disabled={!this.state.isValid}>
              Solve
            </button>
            <button className="button" onClick={event => this.handleClear(event)}>
              Clear
            </button>
          </div>
        </form>
        <div className="details">Find out how this works at the <a href="https://github.com/arromeo/ts-sudoku-solver">Github Repo</a></div>
      </div>
    )
  }
}

export default InputBoard
