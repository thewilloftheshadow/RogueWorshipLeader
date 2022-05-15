const { MessageActionRow, Modal, TextInputComponent, MessageEmbed } = require("discord.js")
const { autoresponse } = require("../../db")
const { modmaster } = require("../../config")
const ms = require("ms")
const archannels = require("../../schemas/archannels")

module.exports = {
  command: {
    name: "toggle",
    description: "Toggle autoresponses in a channel",
    defaultPermission: true,
    options: [
      {
        type: "CHANNEL",
        name: "channel",
        description: "Select the channel to toggle autoresponses in",
        required: true,
        channelTypes: ["GUILD_NEWS", "GUILD_TEXT", "GUILD_PUBLIC_THREAD", "GUILD_PRIVATE_THREAD"],
      }
    ],
  },
  permissions: [],
  run: async (interaction, client) => {
    if (!interaction.dbUser.perms.autoresponse)
      return interaction.reply("You don't have permission to do that. Ask a mod to use /modmaster if you think you should.")

    const channel = interaction.options.getChannel("channel")
    
    const channelDb = await archannels.findOne({ channel: channel.id })
    if(!channelDb) {
      const newChannel = new archannels({
        channel: channel.id,
        disabled: true
      })
      await newChannel.save()
      interaction.reply(`Channel ${channel.name} has been disabled.`)
    } else {
      await archannels.deleteOne({ channel: channel.id })
      interaction.reply(`Channel ${channel.name} has been enabled.`)
    }
  },
}
