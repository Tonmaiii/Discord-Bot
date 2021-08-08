console.clear()

const Discord = require('discord.js')

const intents = new Discord.Intents(32767)

const client = new Discord.Client({ intents })

client.on('ready', () => console.log('Bot is online'))

client.on('messageCreate', (message) => {
    if (!message.author.bot) message.reply(message.content)
})

client.login('ODI3ODQzNTkwMzg1MzAzNTUy.YGg7bA.gyue8Ap-Ycx51UmiG3h4hmkao7I')
