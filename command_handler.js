let commands = {}

require('fs')
    .readdirSync('commands')
    .forEach(function (file) {
        commands[file.slice(0, -3)] = require(`./commands/${file}`)
    })

module.exports = message => {
    if (message.content.startsWith('!')) {
        let args = message.content.slice(1).split(' ')
        args = message.content
            .slice(1)
            .split(' ')
            .filter(str => str)
        try {
            commands[args[0]](message, args)
        } catch (err) {
            message.channel.send(
                `**\`Command:\`**\` ${args[0]}\`\n\n**\`Error:\`**\`\n${err}\``
            )
        }
    }
}
