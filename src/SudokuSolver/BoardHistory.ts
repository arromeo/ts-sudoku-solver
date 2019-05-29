/*
 * The board history keeps an array of functions to undo changes made by the
 * solver when a branch is found to be unsolvabled. If the history array is
 * exhausted, the entire board is determined to be unsolvable.
 */

export type HistoryFunction = () => void

export class BoardHistory {
  private history: HistoryFunction[]

  constructor() {
    this.history = []
  }

  // Adds a single item to the history array.
  public add(callback: HistoryFunction) {
    this.history.push(callback)
  }

  // Adds a list of history items to the history array.
  public merge(historyItems: HistoryFunction[]) {
    historyItems.forEach(item => this.add(item))
  }

  // Returns the most recent item or undefined if array exhausted.
  public get(): HistoryFunction | undefined {
    return this.history.pop()
  }
}
