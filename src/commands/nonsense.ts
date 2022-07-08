import { CommandInteraction } from 'discord.js'

const handler = (interaction: CommandInteraction) => {
    interaction.reply('glub\nblun\nnorin\nwreaid\nquniop\ntutrtles\ndoes being stress is good or bad\nfacorisaton\nhisself').catch(console.error)
}

const info = {
    name: 'nonsense',
    description: 'Does nonsense things'
}

module.exports = { handler, info }
