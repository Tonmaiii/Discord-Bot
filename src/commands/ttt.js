const Discord = require('discord.js')
const { make_new_game } = require('../misc/tictactoe')

function createButton(label, id) {
    return new Discord.MessageButton({
        label: label,
        style: 'SECONDARY',
        customId: id
    })
}

const createEmbed = (p1, p2) => [
    {
        title: 'Playing Tic-Tac-Toe',
        fields: [
            {
                name: '◯',
                value: `<@!${p1}>`,
                inline: true
            },
            {
                name: 'VS',
                value: '­',
                inline: true
            },
            {
                name: '╳',
                value: `<@!${p2}>`,
                inline: true
            }
        ]
    },
    {
        title: 'Current turn',
        fields: [
            {
                name: '◯',
                value: `<@!${p1}>`,
                inline: true
            }
        ]
    }
]

const createComponent = () => [
    new Discord.MessageActionRow({
        components: [
            createButton(' ', 'ttt.1'),
            createButton(' ', 'ttt.2'),
            createButton(' ', 'ttt.3')
        ]
    }),
    new Discord.MessageActionRow({
        components: [
            createButton(' ', 'ttt.4'),
            createButton(' ', 'ttt.5'),
            createButton(' ', 'ttt.6')
        ]
    }),
    new Discord.MessageActionRow({
        components: [
            createButton(' ', 'ttt.7'),
            createButton(' ', 'ttt.8'),
            createButton(' ', 'ttt.9')
        ]
    })
]

const handler = async interaction => {
    const player = interaction.user.id
    const mention = interaction.options.get('opponent')
    const opponent = mention.value

    if (mention.role) {
        // Is not person
        interaction.reply({
            content: `${mention.role.name} is not a person`,
            ephemeral: true
        })
        return
    }

    if (opponent === player) {
        interaction.reply({
            content: 'You cannot play with yourself',
            ephemeral: true
        })
        return
    }

    const reply = await interaction.reply({
        embeds: createEmbed(player, opponent),
        components: createComponent(),
        fetchReply: true
    })

    make_new_game(reply, player, opponent)
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
