const { users } = require("../db")
const {formatConfig} = require("../fn")
module.exports = async (interaction, client, args) => {
  let userDb = await users.findOne({ user: args[0] }).exec()

  userDb.pingGif = interaction.fields.components[0].components[0].value

  userDb.save()

  let m = interaction.message
  
  m.embeds[0].fields.pop()

  m.embeds[0].fields[m.embeds[0].fields.length - 1] = formatConfig(userDb)

  m.edit({ embeds: [m.embeds[0]], components: [] })
}
