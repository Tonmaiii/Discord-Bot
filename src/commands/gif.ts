import { CommandInteraction } from 'discord.js'
import fetch from 'node-fetch'
const resultsNum = 10

export const handler = async (interaction: CommandInteraction) => {
    const search = interaction.options.get('search')?.value
    const url = `https://g.tenor.com/v1/search?q=${search}&key=${process.env.TENOR_KEY}&limit=${resultsNum}`
    const response = await fetch(url)
    const { results } = await response.json()
    interaction.reply(results[(Math.random() * results.length) | 0].url)
}

export const info = {
    name: 'gif',
    description: 'Post a gif',
    options: [
        {
            type: 'STRING',
            description: 'Search term',
            require: false,
            name: 'search'
        }
    ]
}
