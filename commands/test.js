const Discord = require('discord.js')

module.exports = (message, args) => {
    message.author.id === process.env.DEBUG_USER_ID &&
        message.channel.send({
            content: 'content',
            embeds: [{ title: 'embeds' }],
            components: [
                new Discord.MessageActionRow({
                    components: [
                        new Discord.MessageButton({
                            label: 'components.MessageButton',
                            style: 'PRIMARY',
                            customId: 'button'
                        })
                    ]
                }),

                new Discord.MessageActionRow({
                    components: [
                        new Discord.MessageSelectMenu({
                            options: [
                                {
                                    label: 'components.MessageSelectMenu',
                                    value: 'value'
                                }
                            ],
                            customId: 'select_menu',
                            placeholder: 'Nothing'
                        })
                    ]
                })
            ]
        })
}
