import { ChatInputCommandInteraction } from 'discord.js'
import { readFileSync } from 'fs'

const nonsense = readFileSync('./src/data/nonsense.txt', 'utf-8')

const handler = (interaction: ChatInputCommandInteraction) => {
    interaction.reply(nonsense).catch(console.error)
}

const info = {
    name: 'nonsense',
    description: 'Does nonsense things'
}

module.exports = { handler, info }
