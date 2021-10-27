const fetch = require('node-fetch')
const { awaitUntilMessage } = require('../handlers/message_await')

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

    response = await fetch(`${process.env.TENSORFLOW_API_URL}shape`, {
        method: 'POST',
        body: JSON.stringify({ url }),
        headers: { 'Content-Type': 'application/json' }
    })

    try {
        const { label } = await response.json()

        interaction.editReply({
            content: `I see some ${label}!`,
            ephemeral: false
        })
    } catch {
        interaction.editReply({
            content: `Bot error`,
            ephemeral: true
        })
    }
}

const info = {
    name: 'shape',
    description: 'Guesses the shape from the image'
}

module.exports = { handler, info }
