const create_commands = require('./create_commands')
const { receiveMessage } = require('./message_await')

module.exports = (message, client) => {
    if (message.content === 'add commands') {
        create_commands(client, message.guild.id)
        message.channel.send('Added commands').catch(console.error)
    }

    receiveMessage(message)
}
