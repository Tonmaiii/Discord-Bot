import * as words from '../data/wordle.json'

export default class Game {
    protected word: string
    guesses: { guess: string; result: (0 | 1 | 2)[] }[] = []

    constructor() {
        this.word =
            words[Math.floor(Math.random() * words.length)].toUpperCase()
    }

    guess(guess: string) {
        // https://gist.github.com/BenDMyers/60deff916cd392a3f9101c2eb218b626

        guess = guess.toUpperCase()

        const guessedLetters = guess
            .split('')
            .map(letter => ({ letter, state: 0 as 0 | 1 | 2 }))

        const solutionLetters = this.word
            .split('')
            .map(letter => ({ letter, includedInGuess: false }))

        // First pass: correct letters in the correct place
        for (let i = 0; i < guessedLetters.length; i++) {
            if (guessedLetters[i].letter === solutionLetters[i].letter) {
                guessedLetters[i].state = 2
                solutionLetters[i].includedInGuess = true
            }
        }

        // Second pass: correct letters in the wrong places
        for (let i = 0; i < guessedLetters.length; i++) {
            if (guessedLetters[i].state === 2) {
                continue
            }

            const letterFoundElsewhere = solutionLetters.find(
                solutionLetter => {
                    const matchesLetter =
                        solutionLetter.letter === guessedLetters[i].letter
                    return matchesLetter && !solutionLetter.includedInGuess
                }
            )

            if (letterFoundElsewhere) {
                guessedLetters[i].state = 1
                letterFoundElsewhere.includedInGuess = true
            }
        }

        const result = guessedLetters.reduce(
            (result, { letter, state }) => {
                result.guess += letter
                result.result.push(state)
                return result
            },
            { guess: '', result: [] as (0 | 1 | 2)[] }
        )
        this.guesses.push(result)
        return result
    }

    static validGuess(guess: string): boolean {
        return words.includes(guess.toLowerCase())
    }
}
