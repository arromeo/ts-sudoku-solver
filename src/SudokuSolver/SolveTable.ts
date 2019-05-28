export type UnitType = 'row' | 'column' | 'block';

export interface SolveTableItem {
  value: number
  unit: UnitType
  unitNumber: number
  score: number
  positions: number[]
}

export class SolveTable {
  private table: SolveTableItem[];

  constructor() {
    this.table = [];
  }

  public add(item: SolveTableItem): void {
    this.table.push(item);
  }

  public get(): SolveTableItem | undefined {
    return this.table.pop();
  }

  public score(): number {
    return this.table.reduce((a, b) => {
      return a + b.score;
    }, 0)
  }
}