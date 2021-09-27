export default (message, args) => {
    let characters =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890.,/\\;\'":<>?!@#$%^&*()_+'

    let result = ''
    for (let i = 0, length = Math.random() * 20; i < length; i++) {
        result += characters[Math.floor(Math.random() * characters.length)]
    }

    message.channel.send(result)
}
