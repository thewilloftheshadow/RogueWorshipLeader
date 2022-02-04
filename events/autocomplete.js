const { users } = require("../db")

module.exports = (client) => {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isAutocomplete()) return
    interaction.dbUser = await users.findOne({ user: interaction.user.id }).exec()
    if (!interaction.dbUser) interaction.dbUser = await new users({ user: interaction.user.id }).save()

    interaction.deferUpdate()
  })
}
