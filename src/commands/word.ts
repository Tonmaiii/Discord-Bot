import { CommandInteraction } from 'discord.js'
import * as words from '../data/words.json'

const handler = (interaction: CommandInteraction) => {
    const length = Math.floor(Math.random() * (10 - 3)) + 3
    const word = words[length][Math.floor(Math.random() * words[length].length)
    interaction.reply(result).catch(console.error)
}

const info = {
    name: 'word',
    description: 'Word'
}

module.exports = { handler, info }
