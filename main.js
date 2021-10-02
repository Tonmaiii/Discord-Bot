console.clear()
console.log('\n'.repeat(10))
require('dotenv').config()

const Discord = require('discord.js')
const handle_message = require('./message_handler.js')
const handle_interaction = require('./interaction_handler.js')

const intents = new Discord.Intents(32767)

const client = new Discord.Client({ intents })

client.on('ready', () => console.log('Bot is online'))

client.on('messageCreate', message => {
    handle_message(message, client)
})
client.on('interactionCreate', handle_interaction)

client.login(process.env.BOT_TOKEN)
