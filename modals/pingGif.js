const { users } = require("../db")
module.exports = async (interaction, client, args) => {
  let userDb = await users.findOne({ user: args[0] }).exec()

  userDb.pingGif = interaction.fields.components[0].components[0].value

  userDb.save()

  let m = interaction.message

  m.embeds[0].fields[m.embeds[0].fields.length - 1] = { name: "Update Complete", value: "Open another ModMaster panel to see your changes." }

  m.edit({ embeds: [m.embeds[0]], components: [] })
}
