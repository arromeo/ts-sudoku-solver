import { Board, BoardValidationResult, EvaluatedBoard } from './types';

/**
 *  Attempts to solve board. Either returns the solved board, or the original
 *  board with errors.
 *
 *  @param board - Board to evaluate
 *  @returns - Solved board or original board with error message
 *
 *  @public
 */
export function evaluateBoard(initialBoard: Board): EvaluatedBoard {
  const validationResult = validateBoard(initialBoard);
  if (validationResult.errorMessage) {
    return {
      board: initialBoard,
      errorMessage: validationResult.errorMessage
    };
  }
}

/**
 *  Validate board is in a non-error state by checking each row, column and
 *  block for duplicates as well as ensuring there are at least 17 clues. Will
 *  also consider empty fields to be in an error state if in the same group.
 *
 *  @param board - Board to validate
 *  @returns - An array of cells that are in an error state
 *
 *  @public
 */
export function validateBoard(board: Board): BoardValidationResult {
  return {
    invalidCells: []
  };
}
