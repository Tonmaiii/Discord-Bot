module.exports = (message, args) => {
    if (parseInt(args[1])) {
        parseInt(args[1]) <= 1000 &&
            message.channel.send('­\n'.repeat(parseInt(args[1])))
    } else {
        message.channel.send('­')
    }
}
