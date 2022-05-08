import { CommandInteraction } from 'discord.js'

const handler = (interaction: CommandInteraction) => {
    const lines = interaction.options.get('lines')?.value as number
    interaction
        .reply('\xad\n'.repeat(0 < lines && lines <= 1000 ? lines : 10))
        .catch(console.error)
}

const info = {
    name: 'empty',
    description: 'Create empty lines',
    options: [
        {
            type: 'INTEGER',
            description: 'Number of lines',
            name: 'lines'
        }
    ]
}

module.exports = { handler, info }
