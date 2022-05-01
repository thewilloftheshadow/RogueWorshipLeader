const { users, facts } = require("../db")
const { titleCase } = require("../fn")

module.exports = (client) => {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isAutocomplete()) return
    interaction.dbUser = await users.findOne({ user: interaction.user.id }).exec()
    if (!interaction.dbUser) interaction.dbUser = await new users({ user: interaction.user.id }).save()

    if (["factcontrol", "facts"].includes(interaction.commandName)) {
      let categories = []
      let allFacts = await facts.find({ guild: interaction.guild.id, deleted: false })
      allFacts.forEach((x) => {
        if (!categories.includes(x.category)) categories.push({ name: titleCase(x.category), value: x.category })
      })
      interaction.respond(categories)
    }
  })
}
