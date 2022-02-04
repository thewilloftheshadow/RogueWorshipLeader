const { users } = require("../db")

/*

Custom IDs are parsed in this way:

command-arg1,arg2,arg3,...arg99





*/
module.exports = (client) => {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isButton()) return
    client.Sentry.setUser({ id: interaction.user.id, username: `${interaction.user.username}#${interaction.user.discriminator}` })

    if (process.env.MAINTENANCE) return interaction.reply({ content: "The bot is currently in maintenance mode. Please try again later.", ephemeral: true })
    let data = interaction.customId.split("-")
    let cmd = data[0]
    let args = data[1] || ""
    if (args) args = args.split(",")
    console.log(cmd, args, interaction.user.id)

    interaction.dbUser = await users.findOne({ user: interaction.user.id }).exec()
    if (!interaction.dbUser) interaction.dbUser = await new users({ user: interaction.user.id }).save()

    let buttonFile = client.buttons.get(cmd)

    console.log(cmd, args)

    if (!buttonFile) return interaction.deferUpdate()

    await buttonFile(interaction, client, args).catch(async (error) => {
      console.error(error)
      interaction.reply({ content: `An error has occurred`, ephemeral: true })
    })
  })
}
