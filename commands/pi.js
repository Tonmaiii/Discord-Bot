const pi = require('fs').readFileSync('assets/pi.txt', 'utf8')

module.exports = (message, args) => {
    if (parseInt(args[1])) {
        message.channel.send(pi.slice(0, parseInt(args[1])))
    } else {
        message.channel.send(pi.slice(0, 10))
    }
}
