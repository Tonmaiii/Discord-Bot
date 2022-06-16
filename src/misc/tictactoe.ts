import { ButtonInteraction, Message, MessageActionRow } from 'discord.js'

export const games = {}

export const makeNewGame = (reply: Message, p1: string, p2: string) =>
    (games[reply.id] = new GameMessage(p1, p2))

class GameMessage {
    game: Game
    turn: number

    constructor(private p1: string, private p2: string) {
        this.game = new Game(p1, p2)
        this.turn = 1
    }

    p1_interaction(interaction: ButtonInteraction, pos: number) {
        this.game.p1play(pos)
        const message = interaction.message as Message

        const components = interaction.message.components as MessageActionRow[]
        const embeds = interaction.message.embeds

        Object.assign(
            components[((pos - 1) / 3) | 0].components[(pos - 1) % 3],
            {
                label: '◯',
                style:
                    process.env.OWNER_USER_ID === this.p1.toString()
                        ? 'SUCCESS'
                        : 'PRIMARY',
                disabled: true
            }
        )

        Object.assign(embeds[1].fields[0], {
            name: '❌',
            value: `<@!${this.p2}>`,
            inline: true
        })

        message.edit({ components, embeds })
    }

    p2_interaction(interaction: ButtonInteraction, pos: number) {
        this.game.p2play(pos)
        const message = interaction.message as Message

        const components = interaction.message.components as MessageActionRow[]
        const embeds = interaction.message.embeds

        Object.assign(
            components[((pos - 1) / 3) | 0].components[(pos - 1) % 3],
            {
                label: '╳',
                style:
                    process.env.OWNER_USER_ID === this.p2.toString()
                        ? 'SUCCESS'
                        : 'DANGER',
                disabled: true
            }
        )

        Object.assign(embeds[1].fields[0], {
            name: '⭕',
            value: `<@!${this.p1}>`,
            inline: true
        })

        message.edit({ components, embeds })
    }
}

class Game {
    board: number[][]
    constructor(private p1: string, private p2: string) {
        this.board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]
    }

    p1play(pos: number) {
        this.board[((pos - 1) / 3) | 0][(pos - 1) % 3] = 1
    }

    p2play(pos: number) {
        this.board[((pos - 1) / 3) | 0][(pos - 1) % 3] = 2
    }

    get_pos(pos: number) {
        return this.board[((pos - 1) / 3) | 0][(pos - 1) % 3]
    }

    check_win() {
        for (let player = 1; player <= 2; player++) {
            for (let i = 0; i < 3; i++) {
                if (
                    this.board[i].every(val => val === player) ||
                    [
                        this.board[0][i],
                        this.board[1][i],
                        this.board[2][i]
                    ].every(val => val === player)
                ) {
                    return player
                }
            }

            if (
                [this.board[0][0], this.board[1][1], this.board[2][2]].every(
                    val => val === player
                ) ||
                [this.board[0][2], this.board[1][1], this.board[2][0]].every(
                    val => val === player
                )
            ) {
                return player
            }
        }

        const draw = this.board.every(row => !row.includes(0))
        if (draw) return -1
    }
}
