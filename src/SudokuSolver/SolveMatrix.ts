import { PossibilityBoard } from './Board'
import { HistoryFunction } from './BoardHistory'
import * as BlockHelpers from '../utils/blockHelpers'

export type BoardUnit = 'row' | 'column' | 'block'

export interface SolvableItem {
  value: number
  unitType: BoardUnit
  unitValue: number
  solutions: number[]
}

export class SolveMatrix {
  private matrix: PossibilityBoard[]

  constructor() {
    this.matrix = []
    for (let i = 0; i < 9; i++) {
      this.matrix.push(new PossibilityBoard())
    }
  }

  public add(row: number, column: number, value: number): HistoryFunction[] {
    const history: HistoryFunction[] = []
    const block = BlockHelpers.positionToBlock(row, column)

    // Sets the cell as unusable in every board
    for (let boardNumber = 0; boardNumber < 9; boardNumber++) {
      const result: HistoryFunction | undefined = this.matrix[boardNumber].add(
        row,
        column
      )
      if (result !== undefined) {
        history.push(result)
      }
    }

    // Sets the row of the incoming value as unusable
    for (let columnNumber = 0; columnNumber < 9; columnNumber++) {
      const result: HistoryFunction | undefined = this.matrix[value].add(
        row,
        columnNumber
      )
      if (result !== undefined) {
        history.push(result)
      }
    }

    // Sets the column of the incoming value as unusable
    for (let rowNumber = 0; rowNumber < 9; rowNumber++) {
      const result: HistoryFunction | undefined = this.matrix[value].add(
        rowNumber,
        column
      )
      if (result !== undefined) {
        history.push(result)
      }
    }

    // Sets the block of the incoming value as unusable
    for (let blockPosition = 0; blockPosition < 9; blockPosition++) {
      const result: HistoryFunction | undefined = this.matrix[value].add(
        BlockHelpers.blockToRow(block, blockPosition),
        BlockHelpers.blockToColumn(block, blockPosition)
      )
      if (result !== undefined) {
        history.push(result)
      }
    }

    return history
  }

  public getSingleBoard(): number[][] {
    return this.matrix[5].board
  }

  public getSolvableItem(): SolvableItem {
    // Attempting to locate a row, column or block with one possible spot

    for (let boardNumber = 0; boardNumber < 9; boardNumber++) {
      for (let columnNumber = 0; columnNumber < 9; columnNumber++) {
        let hits: number[] = []
        for (let rowNumber = 0; rowNumber < 9; rowNumber++) {
          if (this.matrix[boardNumber].board[rowNumber][columnNumber] === 1) {
            hits.push(rowNumber)
            if (hits.length > 1) {
              break
            }
          }
        }

        if (hits.length === 1) {
          return {
            value: boardNumber,
            unitType: 'column',
            unitValue: columnNumber,
            solutions: hits,
          }
        }
      }
    }

    for (let boardNumber = 0; boardNumber < 9; boardNumber++) {
      for (let rowNumber = 0; rowNumber < 9; rowNumber++) {
        let hits: number[] = []
        for (let columnNumber = 0; columnNumber < 9; columnNumber++) {
          if (this.matrix[boardNumber].board[rowNumber][columnNumber] === 1) {
            hits.push(columnNumber)
            if (hits.length > 1) {
              break
            }
          }
        }

        if (hits.length === 1) {
          return {
            value: boardNumber,
            unitType: 'row',
            unitValue: rowNumber,
            solutions: hits,
          }
        }
      }
    }

    for (let boardNumber = 0; boardNumber < 9; boardNumber++) {
      for (let blockNumber = 0; blockNumber < 9; blockNumber++) {
        let hits: number[] = []
        for (let positionNumber = 0; positionNumber < 9; positionNumber++) {
          if (
            this.matrix[boardNumber].board[
              BlockHelpers.blockToRow(blockNumber, positionNumber)
            ][BlockHelpers.blockToColumn(blockNumber, positionNumber)] === 1
          ) {
            hits.push(positionNumber)
            if (hits.length > 1) {
              break
            }
          }
        }

        if (hits.length === 1) {
          return {
            value: boardNumber,
            unitType: 'block',
            unitValue: blockNumber,
            solutions: hits,
          }
        }
      }
    }
  }
}
