const { awaitUntilMessage } = require('../handlers/message_await')
const TeachableMachine = require('@sashido/teachablemachine-node')

const model = new TeachableMachine({
    modelUrl: 'https://teachablemachine.withgoogle.com/models/rcBmdkGbn/'
})

const handler = async interaction => {
    await interaction.reply({
        content: 'Waiting for you to send an image',
        ephemeral: true
    })

    const getImageFromMessage = message => {
        if (message.channel.id !== interaction.channel.id)
            return { resolved: false }

        const attachment = message.attachments.first()

        if (attachment?.contentType.startsWith('image'))
            return { resolved: true, result: attachment.url }

        return { resolved: false }
    }

    const url = await awaitUntilMessage(getImageFromMessage)

    const predictions = await model.classify({
        imageUrl: url
    })

    interaction
        .followUp(`I see some ${predictions[0].class}!`)
        .catch(console.error)
}

const info = {
    name: 'shape',
    description: 'Guesses the shape from the image'
}

module.exports = { handler, info }
