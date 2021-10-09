const fetch = require('node-fetch')

module.exports = async message => {
    if (message.attachments.first()?.contentType.startsWith('image')) {
        const url = message.attachments.first().url

        response = await fetch(`${process.env.TENSORFLOW_API_URL}shape`, {
            method: 'POST',
            body: JSON.stringify({ url }),
            headers: { 'Content-Type': 'application/json' }
        })
        const { label } = await response.json()

        message.channel.send(`I see some ${label}!`)
    }
}
