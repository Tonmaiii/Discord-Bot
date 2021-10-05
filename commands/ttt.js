const Discord = require('discord.js')

function CreateButton(label, id) {
    return new Discord.MessageButton({
        label: label,
        style: 'SECONDARY',
        customId: id
    })
}

module.exports = (message, args) => {
    if (args[1]) {
        if (args[1].slice(3, -1) === message.author.id) {
            message.channel.send('You cannot play with yourself')
        } else if (args[1].startsWith('<@') && args[1].endsWith('>')) {
            message.channel
                .send({
                    embeds: [
                        {
                            title: 'Playing Tic-Tac-Toe',
                            fields: [
                                {
                                    name: '◯',
                                    value: `<@!${message.author.id}>`,
                                    inline: true
                                },
                                {
                                    name: 'VS',
                                    value: '­',
                                    inline: true
                                },
                                {
                                    name: '╳',
                                    value: args[1],
                                    inline: true
                                }
                            ]
                        },
                        {
                            title: 'Current turn',
                            fields: [
                                {
                                    name: '◯',
                                    value: `<@!${message.author.id}>`,
                                    inline: true
                                }
                            ]
                        }
                    ],
                    components: [
                        new Discord.MessageActionRow({
                            components: [
                                CreateButton(' ', 'ttt.1'),
                                CreateButton(' ', 'ttt.2'),
                                CreateButton(' ', 'ttt.3')
                            ]
                        }),
                        new Discord.MessageActionRow({
                            components: [
                                CreateButton(' ', 'ttt.4'),
                                CreateButton(' ', 'ttt.5'),
                                CreateButton(' ', 'ttt.6')
                            ]
                        }),
                        new Discord.MessageActionRow({
                            components: [
                                CreateButton(' ', 'ttt.7'),
                                CreateButton(' ', 'ttt.8'),
                                CreateButton(' ', 'ttt.9')
                            ]
                        })
                    ]
                })
                .then(sent_message => {
                    require('../src/tictactoe.js').make_new_game(
                        sent_message,
                        message.author.id,
                        args[1]
                            .replace('<@', '')
                            .replace('>', '')
                            .replace('!', '')
                    )
                })
        } else {
            message.channel.send('Tag a person to start playing')
        }
    }
}
