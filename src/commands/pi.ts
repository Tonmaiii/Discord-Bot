import { CommandInteraction } from 'discord.js'
import * as pi from '../data/pi.json'

const handler = (interaction: CommandInteraction) => {
    const digits = interaction.options.get('digits')?.value as number
    interaction
        .reply(pi.slice(0, 0 < digits && digits <= 2000 ? digits : 10))
        .catch(console.error)
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
