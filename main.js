console.clear()

const { Client, Intents } = require('discord.js')
const handle_command = require('./command_handler.js')

const intents = new Intents(32767)

const client = new Client({ intents })

client.on('ready', () => console.log('Bot is online'))

client.on('messageCreate', handle_command)

client.login('ODI3ODQzNTkwMzg1MzAzNTUy.YGg7bA.gyue8Ap-Ycx51UmiG3h4hmkao7I')
