const { receiveMessage } = require('./message_await')

module.exports = (message, client) => {
    receiveMessage(message)
}
