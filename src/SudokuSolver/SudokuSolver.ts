import { BoardHistory } from './BoardHistory'
import { SudokuBoard } from './Board'
import { SolveMatrix } from './SolveMatrix'
import * as BlockHelper from '../utils/blockHelpers'

type StatusType = 'forward' | 'backward' | 'solveCheck' | 'solved' | 'unsolvable'
const validCell = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export class SudokuSolver {
  private mainBoard: SudokuBoard
  private boardHistory: BoardHistory
  private solveMatrix: SolveMatrix
  private status: StatusType

  constructor() {
    this.mainBoard = new SudokuBoard()
    this.boardHistory = new BoardHistory()
    this.solveMatrix = new SolveMatrix()
    this.status = 'forward'
  }

  private populateBoard(input: string[][]): void {
    input.forEach((rowArr, row) => {
      rowArr.forEach((value, column) => {
        let newValue: number = parseInt(value)
        if (validCell.includes(newValue)) {
          this.boardHistory.merge(this.solveMatrix.add(row, column, newValue - 1))
          this.boardHistory.add(this.mainBoard.add(row, column, newValue))
        }
      })
    })
  }

  public solve(input: string[][]): string[][] | string {
    this.populateBoard(input)
    while (this.status === 'forward' || this.status === 'backward') {
      if (this.status === 'forward') {
        let nextItem = this.solveMatrix.getSolvableItem()
        if (nextItem !== undefined) {
          switch (nextItem.unitType) {
            case 'row':
              if (nextItem.solutions.length > 1) {
                for (let i = 1; i < nextItem.solutions.length; i++) {
                  this.boardHistory.add({
                    row: nextItem.unitValue,
                    column: nextItem.solutions[i],
                    value: nextItem.value,
                    boardType: 'main',
                    ghost: true,
                  })
                }
              }
              this.boardHistory.merge(
                this.solveMatrix.add(nextItem.unitValue, nextItem.solutions[0], nextItem.value)
              )
              this.boardHistory.add(
                this.mainBoard.add(nextItem.unitValue, nextItem.solutions[0], nextItem.value + 1)
              )
              break
            case 'column':
              if (nextItem.solutions.length > 1) {
                for (let i = 1; i < nextItem.solutions.length; i++) {
                  this.boardHistory.add({
                    row: nextItem.solutions[i],
                    column: nextItem.unitValue,
                    value: nextItem.value,
                    boardType: 'main',
                    ghost: true,
                  })
                }
              }
              this.boardHistory.merge(
                this.solveMatrix.add(nextItem.solutions[0], nextItem.unitValue, nextItem.value)
              )
              this.boardHistory.add(
                this.mainBoard.add(nextItem.solutions[0], nextItem.unitValue, nextItem.value + 1)
              )
              break
            case 'block':
              if (nextItem.solutions.length > 1) {
                for (let i = 0; i < nextItem.solutions.length; i++) {
                  this.boardHistory.add({
                    row: BlockHelper.blockToRow(nextItem.unitValue, nextItem.solutions[i]),
                    column: BlockHelper.blockToColumn(nextItem.unitValue, nextItem.solutions[i]),
                    value: nextItem.value,
                    boardType: 'main',
                    ghost: true,
                  })
                }
              }
              this.boardHistory.merge(
                this.solveMatrix.add(
                  BlockHelper.blockToRow(nextItem.unitValue, nextItem.solutions[0]),
                  BlockHelper.blockToColumn(nextItem.unitValue, nextItem.solutions[0]),
                  nextItem.value
                )
              )
              this.boardHistory.add(
                this.mainBoard.add(
                  BlockHelper.blockToRow(nextItem.unitValue, nextItem.solutions[0]),
                  BlockHelper.blockToColumn(nextItem.unitValue, nextItem.solutions[0]),
                  nextItem.value + 1
                )
              )
              break
            default:
              throw Error('Return type of SolveMatrix is not a solvable type')
          }
        } else {
          if (this.mainBoard.score() === 405) {
            this.status = 'solved'
          } else {
            this.status = 'backward'
          }
        }
      } else {
        if (this.boardHistory.length() > 0) {
          let action = this.boardHistory.get()
          if (action.ghost === false) {
            if (action.boardType === 'main') {
              this.mainBoard.remove(action.row, action.column)
            } else {
              this.solveMatrix.remove(action.row, action.column, action.value)
            }
          } else {
            this.boardHistory.merge(this.solveMatrix.add(action.row, action.column, action.value))
            this.boardHistory.add(this.mainBoard.add(action.row, action.column, action.value + 1))
            this.status = 'forward'
          }
        } else {
          return 'We submitted the puzzle and the solver said no.'
        }
      }
    }

    return this.mainBoard.toString()
  }
}
