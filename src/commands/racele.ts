import { CommandInteraction } from 'discord.js'

const handler = (interaction: CommandInteraction) => {
    interaction.reply('https://racele.netlify.app').catch(console.error)
}

const info = {
    name: 'racele',
    description: 'Play multiplayer wordle'
}

module.exports = { handler, info }
