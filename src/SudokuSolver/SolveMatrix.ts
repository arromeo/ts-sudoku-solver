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

    let result: HistoryItem | undefined

    // Sets cells in possibility boards as unusable
    for (let i = 0; i < 9; i++) {
      result = this.matrix[i].add(row, column, i)
      result && history.push(result)

      result = this.matrix[value].add(row, i, value)
      result && history.push(result)

      result = this.matrix[value].add(i, column, value)
      result && history.push(result)

      result = this.matrix[value].add(
        BlockHelpers.blockToRow(block, i),
        BlockHelpers.blockToColumn(block, i),
        value
      )
      result && history.push(result)
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
                  column = BlockHelpers.blockToColumn(iOuter, iInner)
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
