import { CommandInteraction } from 'discord.js'
import { readdirSync } from 'fs'

let commands = {}

readdirSync('./dist/commands').forEach(async file => {
    commands[file.replace(/\..+$/, '')] = await import(`../commands/${file}`)
})

export default (interaction: CommandInteraction) => {
    try {
        commands[interaction.commandName]?.handler(interaction)
    } catch (e) {
        console.error(e)
    }
}
