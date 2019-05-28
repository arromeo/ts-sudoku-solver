/*
 * The board history keeps a record of changes made to both the main board
 * and the possibility boards. If the solver chooses between two paths, it sets
 * a special history item with the branch value set to true. If the branch is
 * found to be unsolvable, it works backwards through the history, undo-ing
 * its changes until it hits a different branch. If it hits the beginning of
 * the queue, there are no more branches to explore and the board is deemed
 * unsolvable.
 */

export interface HistoryItem {
  row: number
  column: number
  value: number
  branch: boolean
}

export class BoardHistory {
  private history: HistoryItem[]

  constructor() {
    this.history = []
  }

  // Adds an item to the history queue.
  public add(
    row: number,
    column: number,
    value: number,
    branch: boolean
  ): void {
    this.history.push({
      row,
      column,
      value,
      branch,
    })
  }

  // Returns the most recent item or undefined if it has reached the end of queue
  public get(): HistoryItem | undefined {
    return this.history.pop()
  }
}
