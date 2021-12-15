const translation = require('../../assets/toki_pona.json')

const handler = interaction => {
    const text = interaction.options.get('text').value
    const words = text.split(' ')
    const translated = words
        .map(word =>
            word
                .match(/^(\W+)?(.+?)(\W+)?$/)
                .slice(1)
                .map((word, i) =>
                    i === 1
                        ? translation[word] === undefined
                            ? `**${word}**`
                            : translation[word]
                        : word
                )
                .join('')
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
