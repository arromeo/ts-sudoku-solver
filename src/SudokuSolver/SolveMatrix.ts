import { PossibilityBoard } from './Board'
import { HistoryItem } from './BoardHistory'
import * as BlockHelpers from '../utils/blockHelpers'

export type BoardUnit = 'row' | 'column' | 'block'

export interface SolvableItem {
  value: number
  unitType: BoardUnit
  unitValue: number
  solutions: number[]
}

export class SolveMatrix {
  public matrix: PossibilityBoard[]

  constructor() {
    this.matrix = []
    for (let i = 0; i < 9; i++) {
      this.matrix.push(new PossibilityBoard())
    }
  }

  public add(row: number, column: number, value: number): HistoryItem[] {
    const history: HistoryItem[] = []
    const block = BlockHelpers.positionToBlock(row, column)

    // Sets the cell as unusable in every board
    for (let boardNumber = 0; boardNumber < 9; boardNumber++) {
      const result: HistoryItem | undefined = this.matrix[boardNumber].add(row, column, boardNumber)
      if (result !== undefined) {
        history.push(result)
      }
    }

    // Sets the row of the incoming value as unusable
    for (let columnNumber = 0; columnNumber < 9; columnNumber++) {
      const result: HistoryItem | undefined = this.matrix[value].add(row, columnNumber, value)
      if (result !== undefined) {
        history.push(result)
      }
    }

    // Sets the column of the incoming value as unusable
    for (let rowNumber = 0; rowNumber < 9; rowNumber++) {
      const result: HistoryItem | undefined = this.matrix[value].add(rowNumber, column, value)
      if (result !== undefined) {
        history.push(result)
      }
    }

    // Sets the block of the incoming value as unusable
    for (let blockPosition = 0; blockPosition < 9; blockPosition++) {
      const result: HistoryItem | undefined = this.matrix[value].add(
        BlockHelpers.blockToRow(block, blockPosition),
        BlockHelpers.blockToColumn(block, blockPosition),
        value
      )
      if (result !== undefined) {
        history.push(result)
      }
    }
    
    return history
  }

  public remove(row: number, column: number, value: number) {
    this.matrix[value].remove(row, column)
  }

  public getSolvableItem(): SolvableItem | undefined {
    const boardTypes: BoardUnit[] = ['row', 'column', 'block']
    let row: number, column: number
    for (let maxSolutions = 1; maxSolutions < 4; maxSolutions++) {
      for (let boardNumber = 0; boardNumber < 9; boardNumber++) {
        for (let iType = 0; iType < 3; iType++) {
          let type: BoardUnit = boardTypes[iType]
          for (let iOuter = 0; iOuter < 9; iOuter++) {
            let hits: number[] = []
            for (let iInner = 0; iInner < 9; iInner++) {
              switch (type) {
                case 'row':
                  row = iOuter
                  column = iInner
                  break
                case 'column':
                  row = iInner
                  column = iOuter
                  break
                case 'block':
                  row = BlockHelpers.blockToRow(iOuter, iInner)
                  column = BlockHelpers.blockToRow(iOuter, iInner)
              }

              if (this.matrix[boardNumber].board[row][column] === 1) {
                hits.push(iInner)
                if (hits.length > maxSolutions) {
                  break
                }
              }
            }

            if (hits.length === maxSolutions) {
              return {
                value: boardNumber,
                unitType: type,
                unitValue: iOuter,
                solutions: hits,
              }
            }
          }
        }
      }
    }
    // If no solutions were found, return undefined
    return undefined
  }
}
