import { Client, GatewayIntentBits, Partials } from 'discord.js'
import { config } from 'dotenv'

import createCommands from './handlers/createCommands'
import handleInteraction from './handlers/interactionHandler'
import handleMessage from './handlers/messageHandler'

config()

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.User,
        Partials.Reaction
    ]
})

client.on('ready', () => {
    console.log('Bot is online')
    createCommands(client, process.env.GUILD_ID)
})

client.on('messageCreate', message => handleMessage(message, client))

client.on('interactionCreate', handleInteraction)

client.login(process.env.BOT_TOKEN)
