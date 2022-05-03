const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const { support } = require("../../config")

module.exports = {
  command: {
    name: "help",
    description: "See how to use the bot",
    defaultPermission: true,
  },
  permissions: [],
  run: async (interaction, client) => {
    interaction.reply("The commands show up when you use `/`, just literally look at those :)\nhttps://tenor.com/bymGR.gif")
  },
}
