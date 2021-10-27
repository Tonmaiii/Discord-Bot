const fs = require('fs')

module.exports = client => {
    const guild = client.guilds.cache.get(process.env.GUILD_ID) // undefined in real bot

    let commands
    if (guild) {
        commands = guild.commands // Guild specific
    } else {
        commands = client.application?.commands // Global commands
    }

    fs.readdirSync('./src/commands').forEach(file => {
        const { info } = require(`../commands/${file}`)
        commands.create(info)
    })

    return commands
}
