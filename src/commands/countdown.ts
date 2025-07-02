import { ChatInputCommandInteraction } from 'discord.js'

const handler = (interaction: ChatInputCommandInteraction) => {
    interaction.reply('https://countdown-bell.netlify.app').catch(console.error)
}

const info = {
    name: 'countdown',
    description: 'Countdown'
}

module.exports = { handler, info }
