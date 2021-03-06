import { HistoryItem } from './BoardHistory'

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

  public print(): string {
    let result = ''
    this.board.forEach(row => {
      result += row.join('') + '\n'
    })

    return result
  }

  public toString(): string[][] {
    const result = []
    for (let row = 0; row < 9; row++) {
      result.push([])
      for (let column = 0; column < 9; column++) {
        result[row].push(this.board[row][column].toString())
      }
    }

    return result
  }
}

export class SudokuBoard extends Board {
  constructor() {
    super(0)
  }

  // Sets cell to provided number and returns a function to undo this action
  public add(row: number, column: number, value: number): HistoryItem {
    if (this.board[row][column] === 0) {
      this.board[row][column] = value
      return {
        row: row,
        column: column,
        value: value,
        boardType: 'main',
        ghost: false,
      }
    }
  }

  //  Sets cell back to zero.
  public remove(row: number, column: number): void {
    this.board[row][column] = 0
  }
}

export class PossibilityBoard extends Board {
  constructor() {
    super(1)
  }

  // Sets cell as unusable and returns a function to undo this action.
  public add(row: number, column: number, value: number): HistoryItem | undefined {
    if (this.board[row][column] === 1) {
      this.board[row][column] = 0
      return {
        row: row,
        column: column,
        value: value,
        boardType: 'possibility',
        ghost: false,
      }
    } else {
      return undefined
    }
  }

  // Sets the cell back to usable.
  public remove(row: number, column: number): void {
    this.board[row][column] = 1
  }
}
