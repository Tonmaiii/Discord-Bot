import { CommandInteraction } from 'discord.js'
import { readFileSync } from 'fs'

const schedule = readFileSync('./src/data/schedule.txt', 'utf-8')

const handler = (interaction: CommandInteraction) => {
    interaction.reply(nonsense).catch(console.error)
}

const info = {
    name: 'schedule',
    description: 'Class schedule'
}

module.exports = { handler, info }
