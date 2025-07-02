import { ChatInputCommandInteraction } from 'discord.js'
import Hangman from '../games/hangman/gameMessage'

const handler = async (interaction: ChatInputCommandInteraction) => {
    try {
        await interaction.reply({ embeds: [{ title: 'Hangman' }] })
        const reply = await interaction.fetchReply()
        if (!reply) return

        Hangman.newGame(reply, interaction.user.id)
    } catch (err) {
        console.error(err)
    }
}

const info = {
    name: 'hangman',
    description: 'Play Hangman'
}

module.exports = { handler, info }
