const { GuildChannel } = require('discord.js')
const { receiveMessage } = require('./message_await')

module.exports = (message, client) => {
    message.guild &&
        message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')

    receiveMessage(message)
}
