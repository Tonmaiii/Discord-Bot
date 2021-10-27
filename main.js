console.clear()
console.log('\n'.repeat(10))
require('dotenv').config()
const { join } = require('path')

//!-------------------------
// TODO: ADD MORE COMMENTS |
//!------------------------

const Discord = require('discord.js')
const create_commands = require('./src/handlers/create_commands')
//! Changing to use slash commands instead
const handle_message = require('./src/handlers/message_handler')
const handle_interaction = require('./src/handlers/interaction_handler')

const intents = new Discord.Intents(32767)

const client = new Discord.Client({ intents })

client.on('ready', () => {
    console.log('Bot is online')
    const commands = create_commands(client)
})

//! Changing to use slash commands instead
client.on('messageCreate', message => {
    handle_message(message, client)
})

client.on('interactionCreate', handle_interaction)

client.login(process.env.BOT_TOKEN)
