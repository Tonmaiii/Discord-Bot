import { ButtonInteraction } from 'discord.js'
import { readdirSync } from 'fs'

let interactions = {}

readdirSync('./dist/buttons').forEach(async file => {
    interactions[file.replace(/\..+$/, '')] = await import(`../buttons/${file}`)
})

export default (interaction: ButtonInteraction) => {
    try {
        const interaction_id = interaction.customId.split('.')
        interactions[interaction_id[0]] &&
            interactions[interaction_id[0]](interaction, interaction_id)

        interaction.deferUpdate()
    } catch (e) {
        console.error(e)
    }
}
