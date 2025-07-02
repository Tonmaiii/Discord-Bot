import { APIEmbed, Colors, Message } from 'discord.js'
import Game from './game'

export default class GameMessage extends Game {
    private static games: { [key: string]: GameMessage } = {}
    turn: 1 | 2 = 2

    private constructor(
        private message: Message,
        private p1: string,
        private p2: string
    ) {
        super()
        this.editMessage()
        this.setUpInteraction()
        this.incrementTurn()
    }

    private setUpInteraction() {
        const emojis = Array(Game.COLUMNS)
            .fill(null)
            .map((_, i) => `${i + 1}\u20E3`)

        emojis.forEach((_, i) =>
            this.message.react(`${i + 1}\u20E3`).catch(console.error)
        )
        const collector = this.message.createReactionCollector({
            filter: reaction => emojis.includes(reaction.emoji.name)
        })

        collector.on('collect', (reaction, user) => {
            if (user === this.message.client.user) return
            reaction.users.remove(user).catch(console.error)

            const player = this.getPlayer(user.id)
            if (player !== this.turn) return

            const column = emojis.indexOf(reaction.emoji.name)
            if (!this.columnIsValid(column)) return
            this.drop(column, player)
            this.editMessage()
            if (this.checkWin(this.turn)) {
                this.finish(this.turn)
                collector.stop()
            }

            if (this.board.every(column => !column.includes(0))) this.finish(0)

            this.incrementTurn()
        })
    }

    private editMessage() {
        this.message.edit({ embeds: this.createEmbed() }).catch(console.error)
    }

    private finish(player: 0 | 1 | 2) {
        this.message.reactions.removeAll()
        this.message
            .edit({
                embeds: [
                    this.createTitle(),
                    this.createWinnerEmbed(player),
                    {
                        description: `${this.createBoard()}\n${Array(
                            Game.COLUMNS
                        )
                            .fill(null)
                            .map((_, i) => `${i + 1}\u20E3`)
                            .join('')}`
                    }
                ]
            })
            .catch(console.error)
        delete GameMessage.games[this.message.id]
    }

    private createEmbed(): APIEmbed[] {
        return [
            this.createTitle(),
            this.createTurnEmbed(),
            {
                description: `${this.createBoard()}\n${Array(Game.COLUMNS)
                    .fill(null)
                    .map((_, i) => `${i + 1}\u20E3`)
                    .join('')}`
            }
        ]
    }

    private createBoard() {
        return this.transposedBoard()
            .map(row => {
                return row.map(cell => this.getSymbol(cell)).join('')
            })
            .join('\n')
    }

    private createTitle(): APIEmbed {
        return {
            title: 'Playing Connect Four',
            fields: [
                {
                    name: this.getSymbol(1),
                    value: `<@${this.p1}>`,
                    inline: true
                },
                {
                    name: 'VS',
                    value: '\xad',
                    inline: true
                },
                {
                    name: this.getSymbol(2),
                    value: `<@${this.p2}>`,
                    inline: true
                }
            ]
        }
    }

    private createTurnEmbed(): APIEmbed {
        return {
            title: 'Current turn',
            fields: [
                {
                    name: this.getSymbol(this.getOpposingTurn()),
                    value: `<@${this.getId(this.getOpposingTurn())}>`,
                    inline: true
                }
            ]
        }
    }

    private createWinnerEmbed(player: 0 | 1 | 2): APIEmbed {
        if (player === 0)
            return {
                title: 'Draw',
                color: Colors.Purple
            }
        else
            return {
                title: 'Winner',
                color: this.getColor(player),
                fields: [
                    {
                        name: this.getSymbol(player),
                        value: `<@${this.getId(player)}>`,
                        inline: true
                    }
                ]
            }
    }

    private getSymbol(player: 0 | 1 | 2) {
        return !player
            ? '⚫'
            : this.getId(player) === process.env.OWNER_USER_ID
            ? '🟢'
            : player === 1
            ? '🔴'
            : '🔵'
    }

    private getColor(player: 1 | 2) {
        return this.getId(player) === process.env.OWNER_USER_ID
            ? Colors.DarkGreen
            : player === 1
            ? Colors.Red
            : Colors.Blue
    }

    static newGame(message: Message, p1: string, p2: string) {
        GameMessage.games[message.id] = new GameMessage(message, p1, p2)
    }

    static getGame(id: string) {
        return GameMessage.games[id]
    }

    private getPlayer(id: string): 1 | 2 {
        if (id === this.p1) return 1
        if (id === this.p2) return 2
        return null
    }

    private getId(player: 1 | 2) {
        if (player === 1) return this.p1
        if (player === 2) return this.p2
        return null
    }

    private getOpposingTurn() {
        return this.turn === 1 ? 2 : 1
    }

    private incrementTurn() {
        this.turn = this.getOpposingTurn()
    }
}
