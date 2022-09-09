import {
    BaseMessageComponentOptions,
    ButtonInteraction,
    CommandInteraction,
    Message,
    MessageActionRowOptions,
    MessageButton,
    MessageButtonOptions,
    MessageButtonStyle,
    MessageReaction,
    User
} from 'discord.js'
import { readFileSync } from 'fs'
import { parse } from 'csv-parse'
import fetch from 'node-fetch'
import { MessageButtonStyles } from 'discord.js/typings/enums'

let languages: {
    name: string
    local: string
    wiki: string
    articles: number
}[]
const languagesTable = readFileSync('./src/data/languages.tsv')
parse(
    languagesTable,
    { delimiter: '\t', columns: true, trim: true },
    (_, data) => {
        languages = data.map((l: { [x: string]: string }) => ({
            name: l.Language as string,
            local: l['Language (local)'] as string,
            wiki: l.Wiki as string,
            articles: parseInt(l.Articles.replace(/,/, ''))
        }))
        languages = languages.filter(language => language.articles >= 100000)
    }
)

const handler = async (interaction: CommandInteraction) => {
    if (!languages) return
    const userId = interaction.user.id
    const choices = selectLanguages()
    const correct = choices[Math.floor(Math.random() * choices.length)]
    console.log(choices)
    console.log(correct)
    
    try {
    const data = await (
        await fetch(
            `https://${correct.wiki}.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=1&explaintext=1&generator=random&grnnamespace=0`
        )
    ).json()
    const article: string = Object.values(data.query.pages)[0]['extract']

    const message: Message = (await interaction
        .reply({
            embeds: [{ description: article }],
            components: createComponent(choices),
            fetchReply: true
        })
        .catch(() => interaction.reply('reply').catch(console.error))) as Message

    const collector = message.createMessageComponentCollector({
        filter: (interaction: ButtonInteraction) =>
            interaction.user.id === userId
    })

    collector.once('collect', (interaction: ButtonInteraction) => {
        message.edit({
            components: displayAnswers(choices, correct, interaction.customId),
            embeds: [
                {
                    description: article,
                    color:
                        interaction.customId === correct.wiki ? 'GREEN' : 'RED'
                }
            ]
        })
    })
    }
    catch (e) {
        interaction.reply('something went wrong').catch(console.error)
        console.error(e)
    }
}

const displayAnswers = (
    choices: {
        name: string
        local: string
        wiki: string
        articles: number
    }[],
    correct: {
        name: string
        local: string
        wiki: string
        articles: number
    },
    selected: string
): (Required<BaseMessageComponentOptions> & MessageActionRowOptions)[] => [
    {
        type: 'ACTION_ROW',
        components: choices.map(({ name, wiki }) =>
            createButton(
                name,
                wiki,
                wiki === correct.wiki
                    ? 'SUCCESS'
                    : wiki === selected
                    ? 'DANGER'
                    : 'SECONDARY'
            )
        )
    }
]

const createComponent = (
    choices: {
        name: string
        local: string
        wiki: string
        articles: number
    }[]
): (Required<BaseMessageComponentOptions> & MessageActionRowOptions)[] => [
    {
        type: 'ACTION_ROW',
        components: choices.map(({ name, wiki }) => createButton(name, wiki))
    }
]

const createButton = (
    label: string,
    id: string,
    style: MessageButtonStyle = 'SECONDARY'
) => {
    return new MessageButton({
        label,
        style,
        customId: id
    } as MessageButtonOptions)
}

const selectLanguages = () => {
    const selected = []
    const unselected = languages
    for (let i = 0; i < 4; i++) {
        console.log(selected)
        const index = Math.floor(Math.random() * unselected.length)
        selected.push(unselected[index])
        unselected.splice(index, 1)
    }
    return selected
}

const info = {
    name: 'language',
    description: 'Guess the language of the wikipedia article'
}

module.exports = { handler, info }
