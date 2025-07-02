import * as TeachableMachine from '@sashido/teachablemachine-node'
import { ChatInputCommandInteraction, Message } from 'discord.js'

const model = new TeachableMachine({
    modelUrl: 'https://teachablemachine.withgoogle.com/models/rcBmdkGbn/'
})

export const handler = async (interaction: ChatInputCommandInteraction) => {
    const startTime = Date.now()
    await interaction.reply({
        content: `Waiting for you to send an image\n*This command will expire <t:${Math.round(
            (startTime + 60 * 1000) / 1000
        )}:R>*`,
        ephemeral: true
    })

    const callback = async (message: Message) => {
        if (Date.now() - startTime > 60 * 1000)
            interaction.client.removeListener('messageCreate', callback)
        if (message.channel.id !== interaction.channel.id) return
        if (message.author.id !== interaction.user.id) return

        const attachment = message.attachments.first()

        if (attachment?.contentType.startsWith('image')) {
            const predictions = await model.classify({
                imageUrl: attachment.url
            })

            message
                .reply(`I see some ${predictions[0].class}!`)
                .catch(console.error)
            interaction.client.removeListener('messageCreate', callback)
        } else {
            interaction
                .followUp({
                    content: `You need to send an image\n*This command will expire <t:${Math.round(
                        (startTime + 60 * 1000) / 1000
                    )}:R>*`,
                    ephemeral: true
                })
                .catch(console.error)
        }
    }

    interaction.client.on('messageCreate', callback)
}

export const info = {
    name: 'shape',
    description: 'Guesses the shape from the image'
}
