const { MessageEmbed } = require("discord.js")
const shuffle = require("shuffle-array")
const { wyr } = require(`../../config`)

module.exports = {
  command: {
    name: "would-you-rather",
    description: "Fetch a random WYR question",
    defaultPermission: true,
  },
  permissions: [],
  run: async (interaction, client) => {
    await interaction.deferReply()
    shuffle(wyr)
    let chosen = wyr[0]

    let embed = new MessageEmbed({ title: "Would you rather...", color: "RANDOM" })
    embed.addField("EITHER...", `${chosen[0]}`)
    embed.addField("OR...", `${chosen[1]}`)

    let m = await interaction.editReply({ embeds: [embed], fetchReply: true })

    await m.react("🇦")
    await m.react("🇧")
  },
}
