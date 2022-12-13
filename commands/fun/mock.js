const { MessageButton, MessageActionRow } = require("discord.js")
module.exports = {
  command: {
    name: "mock",
    description: "Mock someone",
    options: [
      {
        type: "STRING",
        name: "message",
        description: "The message to mock",
        required: true,
      },
      { type: "CHANNEL", name: "channel", description: "The channel to echo to", required: false },
    ],
  },
  permissions: [],
  run: async (interaction, client) => {
    await interaction.deferReply({ ephemeral: true })
    let message = interaction.options.get("message")?.value
    let mock = message.split("").map((char, i) => {
      if (i % 2 == 0) return char.toUpperCase()
      else return char
    })
    let channel = interaction.options.get("channel")?.value
    if (!channel) channel = interaction.channel.id
    let m = await interaction.guild.channels.resolve(channel).send(mock.join(""))
    let btn = new MessageButton()
      .setStyle("LINK")
      .setLabel("View Message")
      .setURL(`https://discord.com/channels/${interaction.guild.id}/${m.channel.id}/${m.id}`)
    await interaction.editReply({ content: "Done", components: [new MessageActionRow().addComponents(btn)], ephemeral: true })
  },
}
