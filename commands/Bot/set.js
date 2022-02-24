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
    if(!interaction.dbUser.perms.pinggif) return interaction.reply("You don't have permission to do that. Ask a mod to use /modmaster if you think you should.")
    if (interaction.options.get("pinggif")?.value) interaction.dbUser.pingGif = interaction.options.get("pinggif")?.value

    await interaction.dbUser.save()

    interaction.reply(`Your current settings:\n>>> Ping GIF: \`${interaction.dbUser.pingGif}\``)
  },
}
