import {
    CommandInteraction,
    MessageButton,
    MessageActionRow,
    Message
} from 'discord.js'

import { createNewGame } from '../misc/rps'

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
                value: `<@!${p1}>`,
                inline: true
            },
            {
                name: '\xad',
                value: `<@!${p2}>`,
                inline: true
            }
        ]
    }
]

const createComponent = (): MessageActionRow[] => [
    new MessageActionRow({
        components: [
            createButton('✊', 'rps.rock'),
            createButton('✋', 'rps.paper'),
            createButton('✌️', 'rps.scissors')
        ]
    })
]

const handler = async (interaction: CommandInteraction) => {
    const player = interaction.user.id
    const mention = interaction.options.get('opponent')
    const opponent = mention.value as string

    if (mention.role) {
        // Is not person
        interaction
            .reply({
                content: `${mention.role.name} is not a person`,
                ephemeral: true
            })
            .catch(console.error)
        return
    }

    // if (opponent === player) {
    //     interaction
    //         .reply({
    //             content: 'You cannot play with yourself',
    //             ephemeral: true
    //         })
    //         .catch(console.error)
    //     return
    // }

    const reply = (await interaction
        .reply({
            embeds: createEmbed(player, opponent),
            components: createComponent(),
            fetchReply: true
        })
        .catch(console.error)) as Message

    createNewGame(reply, player, opponent)

    if (!reply) return
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
