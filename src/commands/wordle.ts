import { CommandInteraction, Message } from 'discord.js'
import Wordle from '../games/wordle/GameMessage'

const handler = async (interaction: CommandInteraction) => {
    const letters = (interaction.options.get('letters')?.value as number) || 5
    const reply = (await interaction
        .reply({ embeds: [{ title: 'Wordle' }], fetchReply: true })
        .catch(console.error)) as Message
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
            type: 'INTEGER',
            description: 'Number of letters',
            name: 'letters'
        }
    ]
}

module.exports = { handler, info }
