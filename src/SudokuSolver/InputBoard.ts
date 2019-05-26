export class InputBoard {
  private row: number[][];
  private col: number[][];
  private blk: number[][];
  private valid: boolean;

  constructor() {
    this.valid = true;
    this.row = [];
    this.col = [];
    this.blk = [];

    for(let i: number = 0; i < 9; i++) {
      this.row.push([]);
      this.col.push([]);
      this.blk.push([]);

      for(let j: number = 0; j < 9; j++) {
        this.row[i].push(0);
        this.col[i].push(0);
        this.blk[i].push(0);
      }
    }
  }

  // Adds changes to board and attempts to validate.
  updateBoard(row: number, col: number, blk: number, value: number) {
    const blkPosition: number = (Math.floor(row % 3) * 3) + Math.floor(col % 3);
    this.row[row][col] = value;
    this.col[col][row] = value;
    this.blk[blk][blkPosition] = value;
    this.validateBoard()
  }

  // Validates the inputBoard to catch duplicate entries.
  // TODO: Refactor validateBoard() to only check changed values
  // TODO: Add validator that requires 17 clues.
  validateBoard() {
    let allElements = document.querySelectorAll('.cell');
    allElements.forEach(element => {
      element.classList.remove('invalid');
      this.valid = true;
    });

    // Checks rows for duplicates.
    this.row.forEach((row, index) => {
      for (let column = 0; column < 9; column++) {
        if (row[column] && row.indexOf(row[column]) !== column) {
          let elements = document.querySelectorAll(`.cell[data-row="${index}"]`);
          elements.forEach(element => {
            element.classList.add('invalid');
            this.valid = false;
          });
        }
      }
    });

    // Checks columns for duplicates.
    this.col.forEach((column, index) => {
      for (let row = 0; row < 9; row++) {
        if (column[row] && column.indexOf(column[row]) !== row) {
          let elements = document.querySelectorAll(`.cell[data-col="${index}"]`);
          elements.forEach(element => {
            element.classList.add('invalid');
            this.valid = false;
          });
        }
      }
    });

    // Checks blocks for duplicates.
    this.blk.forEach((blk, index) => {
      for (let blkPosition = 0; blkPosition < 9; blkPosition++) {
        if (blk[blkPosition] && blk.indexOf(blk[blkPosition]) !== blkPosition) {
          let elements = document.querySelectorAll(`.cell[data-blk="${index}"]`);
          elements.forEach(element => {
            element.classList.add('invalid');
            this.valid = false;
          })
        }
      }
    });
  }

  public board(): number[][] {
    return this.row;
  }

  public isValid(): boolean {
    return this.valid;
  }
}

export default InputBoard;