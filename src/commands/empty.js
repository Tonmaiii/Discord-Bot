const handler = interaction => {
    const lines = interaction.options.get('lines')?.value
    interaction.reply('­\n'.repeat(0 < lines <= 1000 ? lines : 10))
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
