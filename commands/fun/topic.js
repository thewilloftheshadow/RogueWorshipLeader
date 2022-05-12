const { MessageEmbed } = require("discord.js")
const shuffle = require("shuffle-array")
const topics = require("../../config/topics")

module.exports = {
  command: {
    name: "topic",
    description: "Get a new topic for the chat",
    defaultPermission: true,
  },
  permissions: [],
  run: async (interaction, client) => {
    await interaction.deferReply()
    let embed = new MessageEmbed({ description: shuffle(topics)[0], color: "RANDOM" })
    let m = await interaction.editReply({ embeds: [embed], fetchReply: true })
  },
}
