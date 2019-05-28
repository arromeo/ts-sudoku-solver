import { PossibilityBoard } from './Board'
import { SolveTable, SolveTableItem } from './SolveTable'

export class SolveMatrix {
  private solveTable: SolveTable
  private matrix: PossibilityBoard[]

  constructor() {
    this.solveTable = new SolveTable()
    this.matrix = []
    for (let i = 0; i < 9; i++) {
      this.matrix.push(new PossibilityBoard())
    }
  }

  public add(row: number, column: number, value: number): void {
    this.matrix[value - 1].add(row, column)
    this.rerun()
  }

  public remove(row: number, column: number, value: number): void {
    this.matrix[value - 1].remove(row, column)
  }

  public rerun(): void {
    let hits: number[] = []
    console.log('hitting this')

    for (let value = 0; value < 9; value++) {
      this.matrix[value].board.forEach((row, rowNumber) => {
        row.forEach((value, cell) => {
          if (value === 1) {
            hits.push(cell)
          }
        })

        if (hits.length === 1 || hits.length === 2) {
          console.log('Narrowed down ' + value)
          this.solveTable.add({
            value,
            unit: 'row',
            unitNumber: rowNumber,
            score: hits.length,
            positions: hits,
          })
        }
      })
    }
  }

  public getSolveTableItem(): SolveTableItem | undefined {
    return this.solveTable.get()
  }
}
