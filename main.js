console.clear()

import { Client, Intents } from 'discord.js'
import handle_command from './command_handler.js'

const intents = new Intents(32767)

const client = new Client({ intents })

client.on('ready', () => console.log('Bot is online'))

client.on('messageCreate', (message) => {
    if (message.content.startsWith('!')) {
        let args = message.content.slice(1).split(' ')

        try {
            handle_command(args, message)
        } catch (err) {
            message.channel.send(`**\`Error:\`**\`\n${err}\``)
        }
    }
})

client.login('ODI3ODQzNTkwMzg1MzAzNTUy.YGg7bA.gyue8Ap-Ycx51UmiG3h4hmkao7I')
