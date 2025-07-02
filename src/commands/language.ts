import { parse } from 'csv-parse'
import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonInteraction,
    ButtonStyle,
    ChatInputCommandInteraction,
    Colors,
    ComponentType,
    MessageActionRowComponentBuilder
} from 'discord.js'
import { readFileSync } from 'fs'
import fetch from 'node-fetch'

type language = {
    name: string
    local: string
    wiki: string
    articles: number
}

let languages: language[]
const languagesTable = readFileSync('./src/data/languages.tsv')
parse(
    languagesTable,
    { delimiter: '\t', columns: true, trim: true },
    (_, data) => {
        languages = data.map(
            (l: {
                [x: string]: string
                Language: string
                Wiki: string
                Articles: string
            }) => ({
                name: l.Language as string,
                local: l['Language (local)'],
                wiki: l.Wiki,
                articles: parseInt(l.Articles.replace(/,/g, ''))
            })
        )
        languages = languages.filter(language => language.articles >= 100000)
    }
)

const handler = async (interaction: ChatInputCommandInteraction) => {
    if (!languages) return
    const userId = interaction.user.id
    const choices = selectLanguages()
    const correct = choices[Math.floor(Math.random() * choices.length)]

    const data = await (
        await fetch(
            `https://${correct.wiki}.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=1&explaintext=1&generator=random&grnnamespace=0`
        )
    ).json()
    const article: string = Object.values(data.query.pages)[0]['extract']

    await interaction
        .reply({
            embeds: [{ description: article }],
            components: createComponent(choices)
        })
        .catch(() => console.error)
    const message = await interaction.fetchReply()
    if (!message) return
    const collector = interaction.channel.createMessageComponentCollector({
        componentType: ComponentType.Button,
        filter: interaction => interaction.user.id === userId
    })

    collector.once('collect', (interaction: ButtonInteraction) => {
        message.edit({
            components: displayAnswers(choices, correct, interaction.customId),
            embeds: [
                {
                    description: article,
                    color:
                        interaction.customId === correct.wiki
                            ? Colors.Green
                            : Colors.Red
                }
            ]
        })
    })
}

const displayAnswers = (
    choices: language[],
    correct: language,
    selected: string
): ActionRowBuilder<MessageActionRowComponentBuilder>[] => [
    new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
        choices.map(({ name, wiki }) =>
            createButton(
                name,
                wiki,
                wiki === correct.wiki
                    ? ButtonStyle.Success
                    : wiki === selected
                    ? ButtonStyle.Danger
                    : ButtonStyle.Secondary
            )
        )
    )
]

const createComponent = (
    choices: language[]
): ActionRowBuilder<MessageActionRowComponentBuilder>[] => [
    new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
        choices.map(({ name, wiki }) => createButton(name, wiki))
    )
]

const createButton = (
    label: string,
    id: string,
    style: ButtonStyle = ButtonStyle.Secondary
): ButtonBuilder => {
    return new ButtonBuilder().setLabel(label).setCustomId(id).setStyle(style)
}

const selectLanguages = () => {
    const selected = []
    const unselected = [...languages]
    for (let i = 0; i < 4; i++) {
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
