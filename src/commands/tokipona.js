const translation = require('../../assets/toki_pona.json')

const handler = interaction => {
    const text = interaction.options.get('text').value
    const words = text.split(' ')
    const translated = words
        .map(word =>
            translation[word] === '' ? '' : translation[word] || `**${word}**`
        )
        .filter(word => word)
        .join(' ')
    interaction.reply(translated)
}

const info = {
    name: 'tokipona',
    description: 'Translates toki pona text to english word for word',
    options: [
        {
            type: 'STRING',
            description: 'Text to translate',
            name: 'text',
            required: true
        }
    ]
}

module.exports = { handler, info }
