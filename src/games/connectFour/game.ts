export default class Game {
    static readonly COLUMNS = 7
    static readonly ROWS = 6
    static readonly WIN_LINES: number[][][] = [
        [
            [0, 0],
            [0, 1],
            [0, 2],
            [0, 3]
        ],
        [
            [0, 0],
            [1, 0],
            [2, 0],
            [3, 0]
        ],
        [
            [0, 0],
            [1, 1],
            [2, 2],
            [3, 3]
        ],
        [
            [0, 0],
            [-1, 1],
            [-2, 2],
            [-3, 3]
        ]
    ]

    board: (0 | 1 | 2)[][] = Array(Game.COLUMNS)
        .fill(null)
        .map(() => Array(Game.ROWS).fill(0))

    drop(column: number, player: 1 | 2): boolean {
        if (!this.columnIsValid(column)) return false
        const row = this.findEmptyRow(column)
        this.board[column][row] = player
        return true
    }

    columnIsValid(column: number) {
        return this.findEmptyRow(column) !== -1
    }

    checkWin(player: 1 | 2): boolean {
        for (let col = 0; col < Game.COLUMNS; col++) {
            for (let row = 0; row < Game.ROWS; row++) {
                const win = Game.WIN_LINES.some(line => {
                    return line.every(
                        ([x, y]) => this.board[x + col]?.[y + row] === player
                    )
                })
                if (win) return true
            }
        }
        return false
    }

    private findEmptyRow(column: number) {
        for (let i = Game.ROWS - 1; i >= 0; i--) {
            if (this.board[column][i] === 0) {
                return i
            }
        }
        return -1
    }

    transposedBoard(): (0 | 1 | 2)[][] {
        return this.board[0].map((_, i) => this.board.map(row => row[i]))
    }
}
