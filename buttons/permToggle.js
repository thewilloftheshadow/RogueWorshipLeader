const { users } = require("../db")
const { formatConfig } = require("../fn")

module.exports = async (interaction, client, args) => {
  let userDb = await users.findOne({ user: args[1] }).exec()

  let buttons = interaction.message.components[0]
  let btn = buttons.components.find((x) => x.customId == interaction.customId)

  console.log(btn)

  if (btn.style == "SUCCESS") {
    btn.style = "DANGER"
    userDb.perms[args[0]] = false
  } else {
    btn.style = "SUCCESS"
    userDb.perms[args[0]] = true
  }

  userDb.save()
  interaction.deferUpdate()

  interaction.message.embeds[0].fields[2].value = formatConfig(userDb)
  
  interaction.message.edit({ components: [buttons], embeds: interaction.message.embeds })
}
