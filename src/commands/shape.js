const { awaitUntilMessage } = require('../handlers/message_await')
const TeachableMachine = require('@sashido/teachablemachine-node')

const model = new TeachableMachine({
    modelUrl: 'https://teachablemachine.withgoogle.com/models/rcBmdkGbn/'
})

const getImageFromMessage = message => {
    const attachment = message.attachments.first()

    if (attachment?.contentType.startsWith('image')) {
        return { resolved: true, result: attachment.url }
    }
    return { resolved: false }
}

const handler = async interaction => {
    await interaction.reply({
        content: 'Waiting for you to send an image',
        ephemeral: true
    })

    const url = await awaitUntilMessage(getImageFromMessage)

    const predictions = await model.classify({
        imageUrl: url
    })

    interaction.channel.send(`I see some ${predictions[0].class}!`)
}

const info = {
    name: 'shape',
    description: 'Guesses the shape from the image'
}

module.exports = { handler, info }
