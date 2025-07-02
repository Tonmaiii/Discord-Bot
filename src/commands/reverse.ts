import {
    ApplicationCommandOptionType,
    ChatInputCommandInteraction
} from 'discord.js'

const handler = (interaction: ChatInputCommandInteraction) => {
    const text = interaction.options.get('text').value as string
    const reversed = text.split('').reverse().join('')
    interaction.reply(reversed).catch(console.error)
}

const info = {
    name: 'reverse',
    description: 'Reverse a text',
    options: [
        {
            type: ApplicationCommandOptionType.String,
            description: 'Text to reverse',
            name: 'text',
            required: true
        }
    ]
}

module.exports = { handler, info }
