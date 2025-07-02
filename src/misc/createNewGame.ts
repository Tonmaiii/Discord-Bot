import {
    ChatInputCommandInteraction,
    InteractionReplyOptions,
    Message
} from 'discord.js'

export const twoPlayerGame = async (
    interaction: ChatInputCommandInteraction,
    replyOption: InteractionReplyOptions,
    gameConstructor: (message: Message, p1: string, p2: string) => any
) => {
    const player = interaction.user.id
    const mention = interaction.options.get('opponent')
    if (!mention) return
    const opponent = mention.value as string

    if (mention.role) {
        // Is not person
        interaction
            .reply({
                content: `${mention.role.name} is not a person`,
                ephemeral: true
            })
            .catch(console.error)
        return
    }

    if (opponent === player) {
        interaction
            .reply({
                content: 'You cannot play with yourself',
                ephemeral: true
            })
            .catch(console.error)
        return
    }

    await interaction.reply({ ...replyOption }).catch(console.error)

    const reply = await interaction.fetchReply()
    if (!reply) return
    gameConstructor(reply, player, opponent)
}
