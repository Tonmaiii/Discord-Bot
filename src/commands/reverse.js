const handler = interaction => {
    const text = interaction.options.get('text').value
    const reversed = text.split('').reverse().join('')
    interaction.reply(reversed).catch(console.error)
}

const info = {
    name: 'reverse',
    description: 'Reverse a text',
    options: [
        {
            type: 'STRING',
            description: 'Text to reverse',
            name: 'text',
            required: true
        }
    ]
}

module.exports = { handler, info }
