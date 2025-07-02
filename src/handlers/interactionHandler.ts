import { ChatInputCommandInteraction, Interaction } from 'discord.js'

import buttonHandler from './buttonHandler'
import commandHandler from './commandHandler'

export default (interaction: Interaction) => {
    if (interaction.isCommand()) {
        commandHandler(interaction as ChatInputCommandInteraction)
        return
    }
    if (interaction.isButton()) {
        buttonHandler(interaction)
        return
    }
}
