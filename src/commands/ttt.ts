import {
    APIActionRowComponent,
    APIButtonComponent,
    APIEmbed,
    ApplicationCommandOptionType,
    ButtonStyle,
    ChatInputCommandInteraction,
    ComponentType
} from 'discord.js'
import { makeNewGame } from '../games/tictactoe'
import { twoPlayerGame } from '../misc/createNewGame'

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
        title: 'Playing Tic-Tac-Toe',
        fields: [
            {
                name: '⭕',
                value: `<@${p1}>`,
                inline: true
            },
            {
                name: 'VS',
                value: '\xad',
                inline: true
            },
            {
                name: '❌',
                value: `<@${p2}>`,
                inline: true
            }
        ]
    },
    {
        title: 'Current turn',
        fields: [
            {
                name: '⭕',
                value: `<@${p1}>`,
                inline: true
            }
        ]
    }
]

const createComponent = (): APIActionRowComponent<APIButtonComponent>[] => [
    {
        type: ComponentType.ActionRow,
        components: [
            createButton('\xad', 'ttt.1'),
            createButton('\xad', 'ttt.2'),
            createButton('\xad', 'ttt.3')
        ]
    },
    {
        type: ComponentType.ActionRow,
        components: [
            createButton('\xad', 'ttt.4'),
            createButton('\xad', 'ttt.5'),
            createButton('\xad', 'ttt.6')
        ]
    },
    {
        type: ComponentType.ActionRow,
        components: [
            createButton('\xad', 'ttt.7'),
            createButton('\xad', 'ttt.8'),
            createButton('\xad', 'ttt.9')
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
        makeNewGame
    )
}

const info = {
    name: 'ttt',
    description: 'Play Tic-Tac-Toe',
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
