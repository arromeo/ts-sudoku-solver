import { InputBoard } from '../InputBoard';
import { SudokuSolver } from '../SudokuSolver';

export function boardGenerator(app: HTMLElement, boardState: InputBoard, solver: SudokuSolver): void {
  // Setup main form and board elements
  const form: HTMLElement = document.createElement('form');
  form.id = 'solver-form';
  const board: HTMLElement = document.createElement('div');
  board.id = 'board';

  // Create rows for cells to reside in.
  for(let i = 0; i < 9; i++) {
    const row: HTMLElement = document.createElement('div');
    row.className = 'row';

    // Create cells to populate rows.
    for(let j = 0; j < 9; j++) {
      const cell: HTMLElement = document.createElement('input');
      cell.id = i + "-" + j;

      // Calculate the cell's block.
      const block: number = (Math.floor(i / 3) * 3) + (Math.floor(j / 3));

      // Set cell locations for validation.
      cell.setAttribute('data-row', i.toString());
      cell.setAttribute('data-col', j.toString());
      cell.setAttribute('data-blk', block.toString());

      // Add extra borders to cells on edges of blocks
      cell.classList.add('cell');
      (j === 2 || j === 5) && cell.classList.add('section-wall');
      (i === 2 || i === 5) && cell.classList.add('section-floor');

      // Add cell to row.
      row.innerHTML += cell.outerHTML;
    }

    // Add row to board.
    board.innerHTML += row.outerHTML;
  }

  // Builds button to submit board.
  const submitButton: HTMLElement = document.createElement('button');
  submitButton.setAttribute('type', 'submit');
  submitButton.innerText = 'Solve';
  submitButton.id = 'submit-button';


  // Builds button container.
  const buttonContainer: HTMLElement = document.createElement('div');
  buttonContainer.innerHTML = submitButton.outerHTML;

  // Inject the board elements into the app entry point and add cell events
  form.innerHTML = board.outerHTML + buttonContainer.outerHTML;
  app.innerHTML = form.outerHTML;
  addCellEvents(boardState);
  addButtonEvents(boardState, solver);
}

// Subscribes the imageBoard instance to changes in the inputs for validation
function addCellEvents(board: InputBoard): void {
  const elements = document.querySelectorAll('.cell');
  const submit = document.querySelector('#submit-button');

  elements.forEach(element => {
    element.addEventListener('keyup', function() {
        const row: number = parseInt(this.getAttribute('data-row'));
        const col: number = parseInt(this.getAttribute('data-col'));
        const blk: number = parseInt(this.getAttribute('data-blk'));
        let value: number = parseInt(this.value) || 0;

        board.updateBoard(row, col, blk, value);

        //TODO: Find out why this implicit type is incorrect. Linter is complaining.
        if(!board.isValid()) {
          document.getElementById('submit-button').disabled = true;
        } else {
          document.getElementById('submit-button').disabled = false;
        }
    });
  });
}

function addButtonEvents(board: InputBoard, solver: SudokuSolver): void {
  const form = document.querySelector('#solver-form');

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    solver.solve(board.board());
  });
}