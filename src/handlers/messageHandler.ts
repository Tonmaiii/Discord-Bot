import { Client, Message } from 'discord.js'
import createCommands from './createCommands'

export default (message: Message, client: Client) => {
    if (message.content === 'add commands') {
        createCommands(client, message.guild.id)
        message.channel.send('Added commands').catch(console.error)
    }
}
