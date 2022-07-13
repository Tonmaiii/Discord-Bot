import { CommandInteraction } from 'discord.js'

import ConnectFour from '../misc/connectFourGameMessage'
import { twoPlayerGame } from '../misc/createNewGame'

const handler = async (interaction: CommandInteraction) => {
    twoPlayerGame(
        interaction,
        { embeds: [{ title: 'Connect Four' }] },
        ConnectFour.newGame
    )
}

const info = {
    name: 'connectfour',
    description: 'Play Connect Four',
    options: [
        {
            type: 'MENTIONABLE',
            description: 'Tag the person you want to play with',
            name: 'opponent',
            required: true
        }
    ]
}

module.exports = { handler, info }
