let interactions = {}

require('fs')
    .readdirSync('interactions')
    .forEach(function (file) {
        interactions[file.slice(0, -3)] = require(`./interactions/${file}`)
    })

module.exports = interaction => {
    let interaction_id = interaction.customId.split('.')
    if (interactions[interaction_id[0]]) {
        interactions[interaction_id[0]](interaction, interaction_id)
    }

    interaction.deferUpdate()
}
