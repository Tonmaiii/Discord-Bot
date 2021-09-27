import readFileSync from 'fs'

export default (message, args) => {
    const pi = readFileSync('assets/pi.txt', 'utf8')
    if (parseInt(args[1])) {
        message.channel.send(pi.slice(0, parseInt(args[1])))
    } else {
        message.channel.send(pi.slice(0, 10))
    }
}
