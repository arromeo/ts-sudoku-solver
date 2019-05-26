import { SolveTable } from './SolveTable'

abstract class Board {
  public board: number[][]

  constructor(fill: number) {
    this.board = []
    for (let i = 0; i < 9; i++) {
      this.board.push([])
      for (let j = 0; j < 9; j++) {
        this.board[i].push(fill)
      }
    }
  }

  abstract add(row: number, column: number, value?: number): void
  abstract remove(row: number, column: number): void

  public score(): number {
    let score = 0
    this.board.forEach(row => {
      row.forEach(cell => {
        score += cell
      })
    })

    return score
  }
}

export class SudokuBoard extends Board {
  constructor() {
    super(0)
  }

  public add(row: number, column: number, value: number): void {
    this.board[row][column] = value
  }

  public remove(row: number, column: number): void {
    this.board[row][column] = 0
  }
}

export class PossibilityBoard extends Board {
  constructor() {
    super(1)
  }

  public add(row: number, column: number): void {
    this.board[row][column] = 0
  }

  public remove(row: number, column: number): void {
    this.board[row][column] = 1
  }
}
