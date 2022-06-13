import { ButtonInteraction } from 'discord.js'
import { readdirSync } from 'fs'

let interactions = {}

readdirSync('./dist/buttons').forEach(async file => {
    interactions[file.replace(/\..+$/, '')] = (
        await import(`../buttons/${file}`)
    ).default
})

export default (interaction: ButtonInteraction) => {
    try {
        const interactionId = interaction.customId.split('.')
        interactions[interactionId[0]]?.(interaction, interactionId)
        interaction.deferUpdate()
    } catch (e) {
        console.error(e)
    }
}
