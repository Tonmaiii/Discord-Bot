module.exports = (message, args) => {
    result = { x: 0, y: 0 }

    args.splice(1).forEach(vector => {
        values = vector.split(',')
        result.x += Math.cos((values[1] / 180) * Math.PI) * values[0]
        result.y += Math.sin((values[1] / 180) * Math.PI) * values[0]
    })

    let magnitude = Math.sqrt(result.x ** 2 + result.y ** 2)
    let direction = Math.acos(result.x / magnitude)
    message.channel.send(
        `x: ${result.x}\ny: ${result.y}\n\nmag: ${magnitude}\ndir: ${
            (direction * 180) / Math.PI
        }`
    )
}
