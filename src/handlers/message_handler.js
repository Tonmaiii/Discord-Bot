const fetch = require('node-fetch')
const { receiveMessage } = require('./message_await')

module.exports = (message, client) => {
    fetch(process.env.TENSORFLOW_API_URL)
    receiveMessage(message)
}
