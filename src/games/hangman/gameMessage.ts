import { Message } from 'discord.js'
import Game from './game'

export default class GameMessage extends Game {
    private static games: { [key: string]: GameMessage } = {}
    private guesses = 0

    private constructor(private message: Message, private player: string) {
        super()
        this.editMessage()
        this.setUpInteraction()
    }

    static newGame(message: Message, player: string) {
        GameMessage.games[message.id] = new GameMessage(message, player)
    }

    private editMessage() {
        this.message
            .edit({
                embeds: [
                    {
                        title: 'Hangman',
                        description: `${this.display()}\nWrong guesses: ${this.displayWrongGuesses()}\n\nGuess a letter`
                    }
                ]
            })
            .catch(console.error)
    }

    private setUpInteraction() {
        const callback = async (message: Message) => {
            if (message.author.id !== this.player) return
            if (!message.content.match(/^[a-zA-Z]$/)) return
            this.guess(message.content.toUpperCase())
            this.guesses++
            this.editMessage()
            if (this.win()) {
                this.generateWinMessage()
                message.client.removeListener('messageCreate', callback)
                return
            }
        }
        this.message.client.on('messageCreate', callback)
    }

    private generateWinMessage() {
        this.message.edit({
            embeds: [
                {
                    title: 'Hangman',
                    description: `${this.display()}\n${
                        this.displayWrongGuesses().length
                    } wrong guesses`,
                    color: 'GREEN'
                }
            ]
        })
    }
}
