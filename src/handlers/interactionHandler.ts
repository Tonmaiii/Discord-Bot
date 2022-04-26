import { Interaction } from 'discord.js'

import commandHandler from './commandHandler'
import buttonHandler from './buttonHandler'

export default (interaction: Interaction) => {
    if (interaction.isCommand()) {
        commandHandler(interaction)
        return
    }
    if (interaction.isButton()) {
        buttonHandler(interaction)
        return
    }
}
