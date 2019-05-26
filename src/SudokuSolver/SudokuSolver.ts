import { BoardHistory } from './BoardHistory';
import { SudokuBoard } from './Board';
import { SolveMatrix } from './SolveMatrix';
import { InputBoard } from './InputBoard';

type StatusType = 'forward' | 'backward' | 'solved' | 'unsolvable';
const validCell = [1,2,3,4,5,6,7,8,9]

export class SudokuSolver {
  private mainBoard: SudokuBoard;
  private boardHistory: BoardHistory;
  private solveMatrix: SolveMatrix;
  private status: StatusType;

  constructor() {
    this.mainBoard = new SudokuBoard();
    this.boardHistory = new BoardHistory();
    this.solveMatrix = new SolveMatrix();
    this.status = 'forward';
  }

  private populateBoard(input: number[][]): void {
    input.forEach((rowArr, row) => {
      rowArr.forEach((value, column) => {
        if (validCell.indexOf(value) !== -1) {
          this.solveMatrix.add(row, column, value);
          this.mainBoard.add(row, column, value);
        } else {
          this.status = 'unsolvable';
        }
      });
    });
  }

  public solve(input: number[][]): string {
    this.populateBoard(input);
    const result: string = '';

    while(this.status === 'forward' || this.status === 'backward') {
      if (this.status === 'forward') {

      } else {
        
      }
    }

    return result;
  }
}