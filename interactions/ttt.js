const { games } = require('../src/tictactoe.js')

module.exports = (interaction, id) => {
    if (games[interaction.message.id]) {
        let game = games[interaction.message.id]
        let pos = parseInt(id[1])

        if (interaction.user.id === game.p1 && game.turn === 1) {
            game.p1_interaction(interaction, pos)
            game.turn = 2
        } else if (interaction.user.id === game.p2 && game.turn === 2) {
            game.p2_interaction(interaction, pos)
            game.turn = 1
        }

        winner = game.game.check_win()
        if (winner) {
            let embeds = interaction.message.embeds

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
                            name: '◯',
                            value: `<@!${game.p1}>`,
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
                            name: '╳',
                            value: `<@!${game.p2}>`,
                            inline: true
                        }
                    ]
                })
            }

            let components = interaction.message.components.map(row => {
                row.components.map(button => {
                    button.disabled = true
                    return button
                })
                return row
            })

            interaction.message.edit({ embeds, components })
        }
    }
}
