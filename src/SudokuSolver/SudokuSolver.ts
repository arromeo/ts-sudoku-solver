import { BoardHistory } from './BoardHistory'
import { SudokuBoard } from './Board'
import { SolveMatrix } from './SolveMatrix'

type StatusType = 'forward' | 'backward' | 'solved' | 'unsolvable'
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

  private populateBoard(input: number[][]): void {
    input.forEach((rowArr, row) => {
      rowArr.forEach((value, column) => {
        let newValue: number = +value
        if (validCell.includes(newValue)) {
          this.boardHistory.merge(this.solveMatrix.add(row, column, newValue))
          this.boardHistory.add(this.mainBoard.add(row, column, newValue))
          let nextItem = this.solveMatrix.getSolvableItem()
        } else {
          this.status = 'unsolvable'
        }
      })
    })
  }

  public solve(input: number[][]): string {
    this.populateBoard(input)
    return this.mainBoard.score().toString()
  }
}
