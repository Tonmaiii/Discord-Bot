const pi = require('../../assets/pi.json')

const handler = interaction => {
    const digits = interaction.options.get('digits')?.value
    interaction.reply(pi.slice(0, 0 < digits && digits <= 2000 ? digits : 10))
}

const info = {
    name: 'pi',
    description: 'The digits of pi',
    options: [
        {
            type: 'INTEGER',
            description: 'Number of digits',
            name: 'digits'
        }
    ]
}

module.exports = { handler, info }
