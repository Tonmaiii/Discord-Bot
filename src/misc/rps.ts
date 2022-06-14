import { ButtonInteraction, Message } from 'discord.js'

export const games: { [key: string]: GameMessage } = {}
const actionMap = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
}

export const createNewGame = (message: Message, p1: string, p2: string) => {
    games[message.id] = new GameMessage(p1, p2)
}

class GameMessage {
    p1action: 'rock' | 'paper' | 'scissors' = null
    p2action: 'rock' | 'paper' | 'scissors' = null

    constructor(private p1: string, private p2: string) {}

    interaction(
        interaction: ButtonInteraction,
        action: 'rock' | 'paper' | 'scissors'
    ) {
        if (interaction.user.id === this.p1 && this.p1action === null) {
            this.p1action = action
            const message = interaction.message as Message
            if (this.p2action === null) {
                message.embeds[0].fields[0].name = '?'
            } else {
                message.embeds[0].fields[0].name = actionMap[this.p1action]
                message.embeds[0].fields[1].name = actionMap[this.p2action]
            }

            const winner = this.getWinner()
            if (winner === 1) message.embeds[0].fields[0].name += ' 🎉🎉🎉'
            if (winner === 2) message.embeds[0].fields[1].name += ' 🎉🎉🎉'
            message.edit({ embeds: message.embeds })
        } else if (interaction.user.id === this.p2 && this.p2action === null) {
            this.p2action = action
            const message = interaction.message as Message
            if (this.p1action === null) {
                message.embeds[0].fields[1].name = '?'
            } else {
                message.embeds[0].fields[0].name = actionMap[this.p1action]
                message.embeds[0].fields[1].name = actionMap[this.p2action]
            }

            const winner = this.getWinner()
            if (winner === 1) message.embeds[0].fields[0].name += ' 🎉🎉🎉'
            if (winner === 2) message.embeds[0].fields[1].name += ' 🎉🎉🎉'
            message.edit({ embeds: message.embeds })
        }
    }

    getWinner() {
        if (this.p1action === null || this.p2action === null) {
            return null
        }
        if (this.p1action === this.p2action) {
            return 0
        }
        if (this.p1action === 'rock') {
            if (this.p2action === 'paper') {
                return 2
            } else {
                return 1
            }
        }
        if (this.p1action === 'paper') {
            if (this.p2action === 'scissors') {
                return 2
            } else {
                return 1
            }
        }
        if (this.p1action === 'scissors') {
            if (this.p2action === 'rock') {
                return 2
            } else {
                return 1
            }
        }
    }
}
