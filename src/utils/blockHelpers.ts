export function blockToRow(block: number, position: number): number {
  return Math.floor(block / 3) * 3 + Math.floor(position / 3)
}

export function blockToColumn(block: number, position: number): number {
  return (block % 3) * 3 + (position % 3)
}

export function positionToBlock(row: number, column: number): number {
  return Math.floor(row / 3) * 3 + Math.floor(column / 3)
}

export function positionToBlockPosition(row: number, column: number): number {
  return (row % 3) * 3 + (column % 3)
}
