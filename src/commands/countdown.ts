import { CommandInteraction } from 'discord.js'

const handler = (interaction: CommandInteraction) => {
    interaction.reply('https://countdown-bell.netlify.app').catch(console.error)
}

const info = {
    name: 'countdown',
    description: 'Countdown'
}

module.exports = { handler, info }
