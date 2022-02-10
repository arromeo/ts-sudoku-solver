# TypeScript Sudoku Solver

As the title suggests, this project is a Sudoku puzzle solver built using TypeScript and React. I had built a similar project in Python last year, but have made some major improvements in this iteration including more solid OOP principles, proper puzzle validation with highlighting, generic functions that could handle updates to rows, columns or blocks rather than repeating loops, and helper functions to produce cleaner, more readable code.

The main focus on this project was to learn and get comfortable with using TypeScript. I'm happy with how this project turned out, and it has really put a fire in my belly to update all of my projects with TypeScript and also has me more interested in exploring OOP languages like C# and Java.

**[See it in action!](https://arromeo.github.io/ts-sudoku-solver/)**

## How It Works

The solver contains four main components. The visible board that the user interacts with, the main solver class, a history log of all changes made to the board and a container holding nine boards, one for every possible number on the bord.

### Visible Board

The board that the user sees is a React component whose state consists of the contents of the board, invalidation information and buttons to solve or clear the board.

Any time the user types a number into the board, the validator runs, checking every row, column or block for duplicates and also whether the board contains 17 clues which is the bare minimum for solving Sudoku puzzles.

### Possibility Board Container

When the program first fires up, all nine of the possibility boards are completely filled with 1s. When numbers are entered into the main board, they must be reflected on the possibility boards in order to find the next solvable instance. For the number that was entered, the row, column and block are all flipped to 0s to indicate it is no longer possible to have that number there. Also, all other possibility boards must switch the cell that was filled in to 0 since it is now occupied by another number.

The container also helps the main solver class find the next numbers to fill in. When requested, all possibility boards are looped through. If a row, column or block has only one instance of 1, then that is the only spot that number can be placed and it is returned to the solver. If there are no rows, columns or blocks with only a single 1, it then considers instances of two 1s. When it finds the first instance of two 1s, it returns both solutions to the solver. There will be more on this case in the next section.

### Board History

The board history contains information on changes that were made to the main board and any of the nine possibility boards. The purpose of this structure is to allow for solving more difficult puzzles that require splits. When there are two possible solutions for a cell, a special item is placed in the history to indicate the path that was not taken. If the path that was taken is determined to be unsolvable, the history array continues to be popped until it reaches that special item, at which point the solver explores that path to try to find a solution.

### Sudoku Solver

The main class controls the flow of the entire program. It first starts off by taking all of the initial clues from the front end and adding them to the main and possibility boards. It then sets the main loop's state to 'forward' and then starts requesting the next solvable items from the possibility container. When the container no longer has any solvable items, the solver checks if the main board is solved by totalling all the cells. If the total is 405, the board is solved and is filled in on the visible board. If it's less, it is unsolvable and sets the state to 'backward'. At this point the loop continues to request items from history and undoing those actions until it hits the special branch item or the history is exhausted. If the history is exhausted, the entire puzzle is determined to be unsolvable and a message is sent back to the user.

## Run Locally

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

To install this project locally you will need to have Node.js installed along with the npm package manager. You can find instructions for installing this for your respective OS [here](https://nodejs.org/en/download/package-manager/)

### Installing

1. Clone this project onto your local machine using the Git CLI or download the .zip file and extract the files into an empty directory.
2. In a terminal, navigate to the folder containing the project files and run `npm install` to download and setup the project's dependencies.
3. Run `npm start`. After building the project, a browser window should automatically pop up, but if not, the default URL is `http://localhost:3000`.

## Built With

* [TypeScript](https://www.typescriptlang.org/docs/home.html) - Programming Language
* [React](https://reactjs.org/docs/getting-started.html) - Front-end Framework
* [Create React App](https://facebook.github.io/create-react-app/docs/getting-started) - Project Setup
* [Immutable.js](https://immutable-js.github.io/immutable-js/docs/#/) - State Updating
