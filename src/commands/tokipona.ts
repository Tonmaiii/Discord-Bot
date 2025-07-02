import {
    ApplicationCommandOptionType,
    ChatInputCommandInteraction
} from 'discord.js'

import * as translation from '../data/toki_pona.json'

const handler = (interaction: ChatInputCommandInteraction) => {
    const text = interaction.options.get('text').value as string
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
        .filter(Boolean)
        .join(' ')
    interaction.reply(translated).catch(console.error)
}

const info = {
    name: 'tokipona',
    description: 'Translates toki pona text to english word for word',
    options: [
        {
            type: ApplicationCommandOptionType.String,
            description: 'Text to translate',
            name: 'text',
            required: true
        }
    ]
}

module.exports = { handler, info }
