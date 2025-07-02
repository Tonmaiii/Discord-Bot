import {
    APIActionRowComponent,
    APIButtonComponent,
    APIEmbed,
    ApplicationCommandOptionType,
    ButtonStyle,
    ChatInputCommandInteraction,
    ComponentType
} from 'discord.js'
import { twoPlayerGame } from '../misc/createNewGame'

import { createNewGame } from '../games/rps'

const createButton = (label: string, id: string): APIButtonComponent => {
    return {
        type: ComponentType.Button,
        label,
        style: ButtonStyle.Secondary,
        custom_id: id
    }
}

const createEmbed = (p1: string, p2: string): APIEmbed[] => [
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

const createComponent = (): APIActionRowComponent<APIButtonComponent>[] => [
    {
        type: ComponentType.ActionRow,
        components: [
            createButton('✊', 'rps.rock'),
            createButton('✋', 'rps.paper'),
            createButton('✌️', 'rps.scissors')
        ]
    }
]

const handler = async (interaction: ChatInputCommandInteraction) => {
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
            type: ApplicationCommandOptionType.Mentionable,
            description: 'Tag the person you want to play with',
            name: 'opponent',
            required: true
        }
    ]
}

module.exports = { handler, info }
