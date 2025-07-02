import { ChatInputCommandInteraction } from 'discord.js'

const handler = (interaction: ChatInputCommandInteraction) => {
    let characters =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890.,/\\;\'":<>?!@#$%^&*()_+'

    let result = ''
    for (let i = 0, length = Math.random() * 20; i < length; i++) {
        result += characters[(Math.random() * characters.length) | 0]
    }

    interaction.reply(result).catch(console.error)
}

const info = {
    name: 'random',
    description: 'Sends random things'
}

module.exports = { handler, info }
