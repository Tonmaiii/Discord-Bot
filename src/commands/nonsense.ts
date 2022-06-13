import { CommandInteraction } from 'discord.js'

const handler = (interaction: CommandInteraction) => {
    interaction.reply('glub\nblun\nnorin\nwreaid\nquniop').catch(console.error)
}

const info = {
    name: 'nonsense',
    description: 'Does nonsense things'
}

module.exports = { handler, info }
