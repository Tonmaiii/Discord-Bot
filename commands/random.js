module.exports = message => {
    let characters =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890.,/\\;\'":<>?!@#$%^&*()_+'

    let result = ''
    for (let i = 0, length = Math.random() * 20; i < length; i++) {
        result += characters[(Math.random() * characters.length) | 0]
    }

    message.channel.send(result)
}
