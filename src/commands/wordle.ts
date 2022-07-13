import { CommandInteraction, Message } from 'discord.js'
import Wordle from '../misc/wordleGameMessage'

const handler = async (interaction: CommandInteraction) => {
    const reply = (await interaction
        .reply({ embeds: [{ title: 'Wordle' }], fetchReply: true })
        .catch(console.error)) as Message
    if (!reply) return
    Wordle.newGame(reply, interaction.user.id)
}

const info = {
    name: 'wordle',
    description: 'Play Wordle'
}

module.exports = { handler, info }
