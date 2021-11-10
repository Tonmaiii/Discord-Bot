const charMap = require('../../assets/greekify.json')

const handler = interaction => {
    const text = interaction.options.get('text').value

    let result = ''
    for (let i = 0; i < text.length; i++) {
        const twoLetters = charMap.twoLetters[text[i] + text[i + 1]]
        if (twoLetters) {
            result += twoLetters
            i++
            continue
        }

        result += charMap.oneLetter[text[i]] || text[i]
    }

    interaction.reply(result)
}

const info = {
    name: 'greekify',
    description: 'Greekfy an english text',
    options: [
        {
            type: 'STRING',
            description: 'Text to greekify',
            name: 'text',
            required: true
        }
    ]
}

module.exports = { handler, info }
