import { CellCoordinates, UnitEnum } from './types';

/**
 * Converts unit-specific indexes into coordinates relative to the board. As an
 * example, ('block', 1, 0) would be the the top middle block, first element,
 * yielding a result of {row: 0, column: 3}.
 *
 * @param unit - Sudoku unit type (i.e. "row")
 * @param unitIndex - Index of that type in relation to the board
 * @param cellIndex - Index of cell within that unit
 * @returns - Board coordinates
 * 
 * @private
 */
export function translateToCoordinates(
  unit: UnitEnum,
  unitIndex: number,
  cellIndex: number
): CellCoordinates {
  if (unitIndex > 8 || unitIndex < 0 || cellIndex > 8 || cellIndex < 0) {
    throw new Error('Invalid index, cannot convert to board coordinates.');
  }

  switch (unit) {
    case 'row':
      return {
        row: unitIndex,
        column: cellIndex
      };
    case 'column':
      return {
        row: cellIndex,
        column: unitIndex
      };
    case 'block':
      return {
        row: Math.floor(unitIndex / 3) * 3 + Math.floor(cellIndex / 3),
        column: (unitIndex % 3) * 3 + (cellIndex % 3)
      };
  }
}
