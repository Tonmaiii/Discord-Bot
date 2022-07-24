import * as words from '../../data/words.json'

export default class Game {
    private word: string
    private guessed = new Set<string>()

    constructor() {
        const length = Math.floor(Math.random() * (10 - 3)) + 3
        this.word =
            words[length][Math.floor(Math.random() * words[length].length)]
    }

    guess(letter: string) {
        this.guessed.add(letter)
    }

    display() {
        return this.word
            .split('')
            .map(letter => (this.guessed.has(letter) ? letter : '\\_'))
            .join('\xad')
    }

    displayWrongGuesses() {
        return Array.from(this.guessed.values())
            .filter(letter => !this.word.includes(letter))
            .sort((a, b) => a.localeCompare(b))
            .join('')
    }

    win() {
        return this.word.split('').every(letter => this.guessed.has(letter))
    }
}
