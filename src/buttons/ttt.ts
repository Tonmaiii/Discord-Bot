import {
    ActionRow,
    ButtonComponent,
    ButtonInteraction,
    Colors
} from 'discord.js'
import { games } from '../games/tictactoe.js'

export default async (interaction: ButtonInteraction, id: string) => {
    if (games[interaction.message.id]) {
        const game = games[interaction.message.id]
        const pos = parseInt(id[1])

        if (
            interaction.user.id === game.p1 &&
            game.turn === 1 &&
            game.game.get_pos(pos) === 0
        ) {
            await game.p1_interaction(interaction, pos)
            game.turn = 2
        } else if (
            interaction.user.id === game.p2 &&
            game.turn === 2 &&
            game.game.get_pos(pos) === 0
        ) {
            await game.p2_interaction(interaction, pos)
            game.turn = 1
        }

        const winner = game.game.check_win()
        if (winner) {
            const embeds = interaction.message.embeds.map(embed =>
                embed.toJSON()
            )

            if (winner === -1) {
                embeds[1] = {
                    ...embeds[1],
                    title: 'Draw',
                    color: Colors.Purple,
                    fields: []
                }
            } else if (winner === 1) {
                embeds[1] = {
                    ...embeds[1],
                    title: 'Winner',
                    color:
                        process.env.OWNER_USER_ID === game.p1
                            ? Colors.DarkGreen
                            : Colors.Blue,
                    fields: [
                        {
                            name: '⭕',
                            value: `<@${game.p1}>`,
                            inline: true
                        }
                    ]
                }
            } else if (winner === 2) {
                embeds[1] = {
                    ...embeds[1],
                    title: 'Winner',
                    color:
                        process.env.OWNER_USER_ID === game.p2
                            ? Colors.DarkGreen
                            : Colors.Red,
                    fields: [
                        {
                            name: '❌',
                            value: `<@${game.p2}>`,
                            inline: true
                        }
                    ]
                }
            }

            const components = interaction.message.components.map(
                (row: ActionRow<ButtonComponent>) => {
                    const newRow = row.toJSON()
                    newRow.components = newRow.components.map(button => ({
                        ...button,
                        disabled: true
                    }))
                    return newRow
                }
            )

            interaction.message
                ?.edit({ embeds, components })
                .catch(console.error)
        }
    }
}
