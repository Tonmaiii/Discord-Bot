import { ButtonInteraction } from 'discord.js'
import { games } from '../games/rps'

export default (interaction: ButtonInteraction, id: string[]) => {
    const game = games[interaction.message.id]
    game.interaction(interaction, id[1] as 'rock' | 'paper' | 'scissors')
}
