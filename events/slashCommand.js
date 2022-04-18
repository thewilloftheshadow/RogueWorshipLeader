const Discord = require("discord.js")
const { users } = require("../db")

const cooldowns = new Discord.Collection()
const prefix = process.env.PREFIX

const { Collection, Util } = require("discord.js")
const { fn, support } = require("../config")
const ms = require("ms")
const ids = require("../config/ids")

module.exports = (client) => {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return
    if (process.env.MAINTENANCE && !ids.devs.includes(interaction.user.id)) return interaction.reply({ content: "The bot is currently in maintenance mode. Please try again later.", ephemeral: true })

    interaction.dbUser = await users.findOne({ user: interaction.user.id }).exec()
    if (!interaction.dbUser) interaction.dbUser = await new users({ user: interaction.user.id }).save()

    let commandFile = client.commands.get(interaction.commandName)

    if (!commandFile) return interaction.reply(`Command not found`)

    await commandFile.run(interaction, client).catch(async (error) => {
      console.error(error)
      interaction.deferred ? interaction.editReply({ content: "An error has occurred", ephemeral: true }) : interaction.reply({ content: "An error has occurred", ephemeral: true })
    })
  })
}
