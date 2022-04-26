import { readdirSync } from 'fs'
import { Client } from 'discord.js'

export default (client: Client, guildId: string): void => {
    const guild = client.guilds.cache.get(guildId) // undefined in real bot
    const commands = guild?.commands ?? client.application.commands

    readdirSync('./dist/commands').forEach(async file => {
        const { info } = await import(`../commands/${file}`)
        commands.create(info).catch(console.error)
    })
}
