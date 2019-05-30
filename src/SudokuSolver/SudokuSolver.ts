import { BoardHistory } from './BoardHistory'
import { SudokuBoard } from './Board'
import { SolveMatrix } from './SolveMatrix'
import * as BlockHelper from '../utils/blockHelpers'

type StatusType =
  | 'forward'
  | 'backward'
  | 'solveCheck'
  | 'solved'
  | 'unsolvable'
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
          this.boardHistory.merge(
            this.solveMatrix.add(row, column, newValue - 1)
          )
          this.boardHistory.add(this.mainBoard.add(row, column, newValue))
        } else {
        }
      })
    })
  }

  public solve(input: string[][]): string {
    this.populateBoard(input)

    while (this.status === 'forward' || this.status === 'backward') {
      if (this.status === 'forward') {
        let nextItem = this.solveMatrix.getSolvableItem()
        if (nextItem !== undefined) {
          switch (nextItem.unitType) {
            case 'row':
              this.boardHistory.merge(
                this.solveMatrix.add(
                  nextItem.unitValue,
                  nextItem.solutions[0],
                  nextItem.value
                )
              )
              this.boardHistory.add(
                this.mainBoard.add(
                  nextItem.unitValue,
                  nextItem.solutions[0],
                  nextItem.value
                )
              )
              break
            case 'column':
              this.boardHistory.merge(
                this.solveMatrix.add(
                  nextItem.solutions[0],
                  nextItem.unitValue,
                  nextItem.value
                )
              )
              this.boardHistory.add(
                this.mainBoard.add(
                  nextItem.solutions[0],
                  nextItem.unitValue,
                  nextItem.value
                )
              )
              break
            case 'block':
              this.boardHistory.merge(
                this.solveMatrix.add(
                  BlockHelper.blockToRow(
                    nextItem.unitValue,
                    nextItem.solutions[0]
                  ),
                  BlockHelper.blockToColumn(
                    nextItem.unitValue,
                    nextItem.solutions[0]
                  ),
                  nextItem.value
                )
              )
              this.boardHistory.add(
                this.mainBoard.add(
                  BlockHelper.blockToRow(
                    nextItem.unitValue,
                    nextItem.solutions[0]
                  ),
                  BlockHelper.blockToColumn(
                    nextItem.unitValue,
                    nextItem.solutions[0]
                  ),
                  nextItem.value
                )
              )
              break
            default:
              throw Error('Return type of SolveMatrix is not a solvable type')
          }
        } else {
          this.status = 'solveCheck'
        }
      } else {
      }
    }
    console.log(this.mainBoard.board)
    return this.mainBoard.score().toString()
  }
}
