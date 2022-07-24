import {
    CommandInteraction,
    MessageButton,
    MessageActionRowOptions,
    BaseMessageComponentOptions
} from 'discord.js'
import { twoPlayerGame } from '../misc/createNewGame'

import { createNewGame } from '../games/rps'

const createButton = (label: string, id: string) => {
    return new MessageButton({
        label,
        style: 'SECONDARY',
        customId: id
    })
}

const createEmbed = (p1: string, p2: string) => [
    {
        title: 'Rock Paper Scissors',
        fields: [
            {
                name: '\xad',
                value: `<@${p1}>`,
                inline: true
            },
            {
                name: '\xad',
                value: `<@${p2}>`,
                inline: true
            }
        ]
    }
]

const createComponent = (): (Required<BaseMessageComponentOptions> &
    MessageActionRowOptions)[] => [
    {
        type: 'ACTION_ROW',
        components: [
            createButton('✊', 'rps.rock'),
            createButton('✋', 'rps.paper'),
            createButton('✌️', 'rps.scissors')
        ]
    }
]

const handler = async (interaction: CommandInteraction) => {
    const player = interaction.user.id
    const mention = interaction.options.get('opponent')
    const opponent = mention.value as string

    twoPlayerGame(
        interaction,
        {
            embeds: createEmbed(player, opponent),
            components: createComponent()
        },
        createNewGame
    )
}

const info = {
    name: 'rps',
    description: 'Play Rock Paper Scissors',
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
