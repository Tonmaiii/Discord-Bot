import { ChatInputCommandInteraction } from 'discord.js'

const handler = (interaction: ChatInputCommandInteraction) => {
    interaction.reply('https://racele.netlify.app').catch(console.error)
}

const info = {
    name: 'racele',
    description: 'Play multiplayer wordle'
}

module.exports = { handler, info }
