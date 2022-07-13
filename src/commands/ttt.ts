import {
    BaseMessageComponentOptions,
    CommandInteraction,
    Message,
    MessageActionRow,
    MessageActionRowOptions,
    MessageButton
} from 'discord.js'
import { twoPlayerGame } from '../misc/createNewGame'
import { makeNewGame } from '../misc/tictactoe'

const createButton = (label: string, id: string) => {
    return new MessageButton({
        label,
        style: 'SECONDARY',
        customId: id
    })
}

const createEmbed = (p1: string, p2: string) => [
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

const createComponent = (): MessageActionRowOptions[] => [
    new MessageActionRow({
        components: [
            createButton(' ', 'ttt.1'),
            createButton(' ', 'ttt.2'),
            createButton(' ', 'ttt.3')
        ]
    }),
    new MessageActionRow({
        components: [
            createButton(' ', 'ttt.4'),
            createButton(' ', 'ttt.5'),
            createButton(' ', 'ttt.6')
        ]
    }),
    new MessageActionRow({
        components: [
            createButton(' ', 'ttt.7'),
            createButton(' ', 'ttt.8'),
            createButton(' ', 'ttt.9')
        ]
    })
]

const handler = async (interaction: CommandInteraction) => {
    const player = interaction.user.id
    const mention = interaction.options.get('opponent')
    const opponent = mention.value as string

    twoPlayerGame(
        interaction,
        {
            embeds: createEmbed(player, opponent),
            components:
                createComponent() as (Required<BaseMessageComponentOptions> &
                    MessageActionRowOptions)[]
        },
        makeNewGame
    )
}

const info = {
    name: 'ttt',
    description: 'Play Tic-Tac-Toe',
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
