const { MessageEmbed } = require("discord.js")
const shuffle = require("shuffle-array")
const { facts } = require("../../db")
const {titleCase} = require("../../fn")

module.exports = {
  command: {
    name: "facts",
    description: "Fetch a random fact",
    defaultPermission: true,
    options: [
      {
        type: "STRING",
        name: "category",
        description: "The category you want to get a fact from",
        required: true,
        autocomplete: true,
      },
    ],
  },
  permissions: [],
  run: async (interaction, client) => {
    await interaction.deferReply()
    let category = interaction.options.get("category").value.toLowerCase()
    let factList = await facts.find({ guild: interaction.guild.id, deleted: false, category: category })

    await shuffle(factList)
    let factData = factList[0]

    if(!factData) return interaction.reply("Unable to find a fact in that category")

    let embed = new MessageEmbed({ title: "Did you know...", color: "RANDOM", footer: titleCase(category), thumbnail: interaction.guild.iconURL({ dynamic: true }) })
    embed.setDescription(factData.fact)

    let m = await interaction.editReply({ embeds: [embed], fetchReply: true })
  },
}
