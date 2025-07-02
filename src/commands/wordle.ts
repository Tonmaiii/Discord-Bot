import {
    ApplicationCommandOptionType,
    ChatInputCommandInteraction
} from 'discord.js'
import Wordle from '../games/wordle/gameMessage'

const handler = async (interaction: ChatInputCommandInteraction) => {
    const letters = (interaction.options.get('letters')?.value as number) || 5
    await interaction
        .reply({ embeds: [{ title: 'Wordle' }] })
        .catch(console.error)
    const reply = await interaction.fetchReply()
    if (!reply) return
    Wordle.newGame(
        reply,
        interaction.user.id,
        Wordle.validLength(letters) ? letters : 5
    )
}

const info = {
    name: 'wordle',
    description: 'Play Wordle',
    options: [
        {
            type: ApplicationCommandOptionType.Integer,
            description: 'Number of letters',
            name: 'letters'
        }
    ]
}

module.exports = { handler, info }
