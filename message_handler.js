let commands = {}

require('fs')
    .readdirSync('commands')
    .forEach(function (file) {
        commands[file.slice(0, -3)] = require(`./commands/${file}`)
    })

module.exports = (message, client) => {
    if (message.content.startsWith('!')) {
        let args = message.content.slice(1).split(' ')
        args = message.content
            .slice(1)
            .split(' ')
            .filter(str => str)
        if (commands[args[0]]) {
            commands[args[0]](message, args, client)
            console.log(`issued command ${args[0]} with arguments ${args}`)
        }
    }
}
