console.clear()

const { Client, Intents } = require('discord.js')
const handle_command = require('./command_handler.js')

const intents = new Intents(32767)

const client = new Client({ intents })

client.on('ready', () => console.log('Bot is online'))

client.on('messageCreate', handle_command)

require('dotenv').config()
client.login(process.env.BOT_TOKEN)
