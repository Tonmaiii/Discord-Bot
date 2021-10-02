const fetch = require('node-fetch')
const results_num = 10

module.exports = (message, args) => {
    let url = `https://g.tenor.com/v1/search?q=${args.slice(1).join(' ')}&key=${
        process.env.TENOR_KEY
    }&limit=${results_num}`

    fetch(url)
        .then(response => response.json())
        .then(json =>
            message.channel.send(
                json.results[(Math.random() * results_num) | 0].url
            )
        )
}
