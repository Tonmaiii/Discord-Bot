let games = {}

function make_new_game(message, p1, p2) {
    games[message.id] = new GameMessage(p1, p2)
}

module.exports = { games, make_new_game }

class GameMessage {
    constructor(p1, p2) {
        this.p1 = p1
        this.p2 = p2
        this.game = new Game(p1, p2)
        this.turn = 1
    }

    p1_interaction(interaction, pos) {
        this.game.p1play(pos)

        let components = interaction.message.components
        let embeds = interaction.message.embeds

        Object.assign(
            components[((pos - 1) / 3) | 0].components[(pos - 1) % 3],
            {
                label: '◯',
                style: 'PRIMARY',
                disabled: true
            }
        )

        Object.assign(embeds[1].fields[0], {
            name: '╳',
            value: `<@!${this.p2}>`,
            inline: true
        })

        interaction.message.edit({ components, embeds })
    }

    p2_interaction(interaction, pos) {
        this.game.p2play(pos)

        let components = interaction.message.components
        let embeds = interaction.message.embeds

        Object.assign(
            components[((pos - 1) / 3) | 0].components[(pos - 1) % 3],
            {
                label: '╳',
                style: 'DANGER',
                disabled: true
            }
        )

        Object.assign(embeds[1].fields[0], {
            name: '◯',
            value: `<@!${this.p1}>`,
            inline: true
        })

        interaction.message.edit({ components, embeds })
    }
}

class Game {
    constructor(p1, p2) {
        this.p1 = p1
        this.p2 = p2
        this.board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]
    }

    p1play(pos) {
        this.board[((pos - 1) / 3) | 0][(pos - 1) % 3] = 1
    }

    p2play(pos) {
        this.board[((pos - 1) / 3) | 0][(pos - 1) % 3] = 2
    }

    get_pos(pos) {
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
        return 0
    }
}
