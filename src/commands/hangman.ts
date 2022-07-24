import { CommandInteraction, Message } from 'discord.js'
import Hangman from '../games/hangman/GameMessage'

const handler = async (interaction: CommandInteraction) => {
    const reply = (await interaction
        .reply({ embeds: [{ title: 'Hangman' }], fetchReply: true })
        .catch(console.error)) as Message
    if (!reply) return
    Hangman.newGame(reply, interaction.user.id)
}

const info = {
    name: 'hangman',
    description: 'Play Hangman'
}

module.exports = { handler, info }
