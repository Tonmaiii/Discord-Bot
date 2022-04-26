import { config } from 'dotenv'
import { Client, Intents } from 'discord.js'

import createCommands from './handlers/createCommands'
import handleMessage from './handlers/messageHandler'
import handleInteraction from './handlers/interactionHandler'

config()

const intents = new Intents(32767)
const client = new Client({ intents })

client.on('ready', () => {
    console.log('Bot is online')
    createCommands(client, process.env.GUILD_ID)
})

client.on('messageCreate', message => handleMessage(message, client))

client.on('interactionCreate', handleInteraction)

client.login(process.env.BOT_TOKEN)
