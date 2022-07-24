import { Message } from 'discord.js'
import Game from './game'

const wordToEmoji = (word: string) => {
    return word
        .split('')
        .map(c => String.fromCharCode(55356, c.charCodeAt(0) + 56741, 0xad))
        .join('')
}

export default class GameMessage extends Game {
    private static games: { [key: string]: GameMessage } = {}

    private constructor(
        private message: Message,
        private player: string,
        letters: number
    ) {
        super(letters)
        this.editMessage()
        this.setUpInteraction()
    }

    static newGame(message: Message, player: string, letters: number) {
        GameMessage.games[message.id] = new GameMessage(
            message,
            player,
            letters
        )
    }

    private editMessage() {
        this.message
            .edit({
                embeds: [
                    {
                        title: 'Wordle',
                        description: `${
                            this.guesses.length
                        }/6\n\n${this.generateResults()}\n\nGuess a ${
                            this.letters
                        } letter word`
                    }
                ]
            })
            .catch(console.error)
    }

    private setUpInteraction() {
        const callback = async (message: Message) => {
            if (message.author.id !== this.player) return
            if (!this.validGuess(message.content)) return
            this.guess(message.content)
            this.editMessage()
            if (message.content.toUpperCase() === this.word) {
                this.generateWinMessage()
                message.client.removeListener('messageCreate', callback)
                message.reply(
                    `${this.word} guessed correctly in ${this.guesses.length}/6 guesses`
                )
                return
            }
            if (this.guesses.length >= 6) {
                this.generateLoseMessage()
                message.client.removeListener('messageCreate', callback)
            }
        }
        this.message.client.on('messageCreate', callback)
    }

    private generateResults() {
        return this.guesses
            .map(({ guess, result }) => {
                return `${wordToEmoji(guess)}\n${result
                    .map(r => (r === 0 ? '⬛' : r === 1 ? '🟨' : '🟩'))
                    .join('')}`
            })
            .join('\n\n')
    }

    private generateWinMessage() {
        this.message.edit({
            embeds: [
                {
                    title: 'Wordle',
                    description: `${
                        this.guesses.length
                    }/6 \n\n${this.generateResults()}\u2800`,
                    color: 'GREEN'
                }
            ]
        })
    }

    private generateLoseMessage() {
        this.message.edit({
            embeds: [
                {
                    title: 'Wordle',
                    description: `${
                        this.guesses.length
                    }/6 \n\n${this.generateResults()}\n\nThe word was ${
                        this.word
                    }`,
                    color: 'RED'
                }
            ]
        })
    }
}
