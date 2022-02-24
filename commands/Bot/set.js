module.exports = {
  command: {
    name: "setset",
    description: "Set setting sets for yourself.",
    defaultPermission: true,
    options: [
      {
        type: "STRING",
        name: "ping-gif",
        description: "The GIF you want displayed when you are pinged",
        required: false,
      },
    ],
  },
  permissions: [],
  run: async (interaction, client) => {
    if (!interaction.member.roles.cache.has("791044221803954188") && !interaction.member.roles.cache.has("812746192081256461"))
      return interaction.reply("You do not have permission to use this command.")
    if (interaction.options.get("ping-gif")?.value) interaction.dbUser.pingGif = interaction.options.get("ping-gif")?.value

    await interaction.dbUser.save()

    interaction.reply(`Your current settings:\n>>> Ping GIF: \`${interaction.dbUser.pingGif}\``)
  },
}
