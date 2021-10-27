let interactions = {}
let commands = {}
const { readdirSync } = require('fs')

readdirSync('./src/commands').forEach(function (file) {
    commands[file.slice(0, -3)] = require(`../commands/${file}`)
})

readdirSync('./src/interactions').forEach(function (file) {
    interactions[file.slice(0, -3)] = require(`../interactions/${file}`)
})

module.exports = interaction => {
    if (interaction.isCommand()) {
        commands[interaction.commandName]?.handler(interaction)
    } else {
        const interaction_id = interaction.customId.split('.')
        interactions[interaction_id[0]] &&
            interactions[interaction_id[0]](interaction, interaction_id)

        interaction.deferUpdate()
    }
}
