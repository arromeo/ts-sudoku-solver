export type CellCoordinates = {
  row: number;
  column: number;
};

export type Cell = {
  coordinates: CellCoordinates;
  value: number;
};

export type Board = Cell[][];

export type BoardError =
  | 'Not enough clues.'
  | 'Cannot be solved.'
  | 'Duplicates.';

export type BoardValidationResult = {
  invalidCells: Cell[];
  errorMessage?: BoardError;
};

export type EvaluatedBoard = {
  board: Board;
  errorMessage?: BoardError;
};

export type HistoryItem = Cell;

export type HistorySplit = Cell[];

export type History = (HistoryItem | HistorySplit)[];

export type UnitEnum = 'row' | 'column' | 'block';
