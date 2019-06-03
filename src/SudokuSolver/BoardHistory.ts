/*
 * The board history keeps an array of actions to undo changes made by the
 * solver when a branch is found to be unsolvabled. If the history array is
 * exhausted, the entire board is determined to be unsolvable.
 */

type BoardType = 'main' | 'possibility'

export interface HistoryItem {
  row: number
  column: number
  value: number
  boardType: BoardType
  ghost: boolean
}

export class BoardHistory {
  private history: HistoryItem[]

  constructor() {
    this.history = []
  }

  // Adds a single item to the history array.
  public add(item: HistoryItem) {
    this.history.push(item)
  }

  // Adds a list of history items to the history array.
  public merge(historyItems: HistoryItem[]) {
    historyItems.forEach(item => this.add(item))
  }

  // Returns the number of items in the history queue
  public length(): number {
    return this.history.length
  }

  // Returns the most recent item or undefined if array exhausted.
  public get(): HistoryItem | undefined {
    return this.history.pop()
  }

  public ghostCount(): number {
    return this.history.filter(item => {
      return item.ghost === true
    }).length
  }
}
