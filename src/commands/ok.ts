import { CommandInteraction } from 'discord.js'
import { readFileSync } from 'fs'

const ok = readFileSync('./src/data/ok.txt', 'utf-8').split('\n')

const handler = (interaction: CommandInteraction) => {
    interaction.reply(ok[Math.floor(Math.random() * ok.length)]).catch(console.error)
}

const info = {
    name: 'ok',
    description: 'Ok'
}

module.exports = { handler, info }
