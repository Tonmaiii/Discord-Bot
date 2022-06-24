import { ButtonInteraction, Message, MessageActionRow } from 'discord.js'
import { games } from '../misc/tictactoe.js'

export default (interaction: ButtonInteraction, id: string) => {
    if (games[interaction.message.id]) {
        const game = games[interaction.message.id]
        const pos = parseInt(id[1])

        if (
            interaction.user.id === game.p1 &&
            game.turn === 1 &&
            game.game.get_pos(pos) === 0
        ) {
            game.p1_interaction(interaction, pos)
            game.turn = 2
        } else if (
            interaction.user.id === game.p2 &&
            game.turn === 2 &&
            game.game.get_pos(pos) === 0
        ) {
            game.p2_interaction(interaction, pos)
            game.turn = 1
        }

        const winner = game.game.check_win()
        if (winner) {
            const embeds = interaction.message.embeds

            if (winner === -1) {
                Object.assign(embeds[1], {
                    title: 'Draw',
                    color: 'PURPLE',
                    fields: []
                })
            } else if (winner === 1) {
                Object.assign(embeds[1], {
                    title: 'Winner',
                    color:
                        process.env.OWNER_USER_ID === game.p1
                            ? 'DARK_GREEN'
                            : 'BLUE',
                    fields: [
                        {
                            name: '⭕',
                            value: `<@${game.p1}>`,
                            inline: true
                        }
                    ]
                })
            } else if (winner === 2) {
                Object.assign(embeds[1], {
                    title: 'Winner',
                    color:
                        process.env.OWNER_USER_ID === game.p2
                            ? 'DARK_GREEN'
                            : 'RED',
                    fields: [
                        {
                            name: '❌',
                            value: `<@${game.p2}>`,
                            inline: true
                        }
                    ]
                })
            }

            const components = (
                interaction.message.components as MessageActionRow[]
            ).map((row: MessageActionRow) => {
                row.components.map(button => {
                    button.disabled = true
                    return button
                })
                return row
            })

            ;(interaction.message as Message)
                ?.edit({ embeds, components })
                .catch(console.error)
        }
    }
}
