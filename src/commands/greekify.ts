import {
    ApplicationCommandOptionType,
    ChatInputCommandInteraction
} from 'discord.js'

import * as charMap from '../data/greekify.json'

const handler = (interaction: ChatInputCommandInteraction) => {
    const text = interaction.options.get('text').value as string

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

    interaction.reply(result).catch(console.error)
}

const info = {
    name: 'greekify',
    description: 'Greekfy an english text',
    options: [
        {
            type: ApplicationCommandOptionType.String,
            description: 'Text to greekify',
            name: 'text',
            required: true
        }
    ]
}

module.exports = { handler, info }
