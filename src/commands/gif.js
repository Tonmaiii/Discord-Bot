const fetch = require('node-fetch')
const results_num = 10

const handler = async interaction => {
    const search = interaction.options.get('search')?.value
    const url = `https://g.tenor.com/v1/search?q=${search}&key=${process.env.TENOR_KEY}&limit=${results_num}`

    const response = await fetch(url)
    const { results } = await response.json()
    interaction.reply(results[(Math.random() * results.length) | 0].url)
}

const info = {
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

module.exports = { handler, info }
