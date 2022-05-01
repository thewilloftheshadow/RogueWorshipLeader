const { MessageButton, MessageActionRow } = require("discord.js")

module.exports = {
  command: {
    name: "echo",
    description: "Say a thing :)",
    defaultPermission: true,
    options: [
      {
        type: "STRING",
        name: "message",
        description: "The message to echo",
        required: true,
      },
      { type: "CHANNEL", name: "channel", description: "The channel to echo to", required: false },
    ],
  },
  permissions: [],
  run: async (interaction, client) => {
    if (!interaction.dbUser.perms.echo)
      return interaction.reply({
        content: "You don't have permission to do that. Ask a mod to use /modmaster if you think you should.",
        ephemeral: true,
      })
    interaction.deferReply({ ephemeral: true })
    let message = interaction.options.get("message")?.value
    let channel = interaction.options.get("channel")?.value
    if (!channel) channel = interaction.channel.id
    let m = await interaction.guild.channels.resolve(channel).send(message)
    let btn = new MessageButton()
      .setStyle("LINK")
      .setLabel("View Message")
      .setURL(`https://discord.com/channels/${interaction.guild.id}/${m.channel.id}/${m.id}`)
    interaction.editReply({ content: "Done", components: [new MessageActionRow().addComponents(btn)], ephemeral: true })
  },
}
