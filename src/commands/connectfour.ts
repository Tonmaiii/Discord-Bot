import {
    CommandInteraction,
    MessageButton,
    MessageActionRow,
    Message,
    MessageEmbed
} from 'discord.js'

import ConnectFour from '../misc/connectFourGameMessage'

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

    if (opponent === player) {
        interaction
            .reply({
                content: 'You cannot play with yourself',
                ephemeral: true
            })
            .catch(console.error)
        return
    }

    const reply = (await interaction
        .reply({
            embeds: [{ title: 'Connect Four' }],
            fetchReply: true
        })
        .catch(console.error)) as Message

    ConnectFour.newGame(reply, player, opponent)

    if (!reply) return
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
