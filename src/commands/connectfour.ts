import {
    ApplicationCommandOptionType,
    ChatInputCommandInteraction
} from 'discord.js'

import ConnectFour from '../games/connectFour/gameMessage'
import { twoPlayerGame } from '../misc/createNewGame'

const handler = async (interaction: ChatInputCommandInteraction) => {
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
            type: ApplicationCommandOptionType.Mentionable,
            description: 'Tag the person you want to play with',
            name: 'opponent',
            required: true
        }
    ]
}

module.exports = { handler, info }
