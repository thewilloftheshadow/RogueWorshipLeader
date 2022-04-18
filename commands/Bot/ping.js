module.exports = {
  command: {
    name: "ping",
    description: "Replies with bot ping.",
    defaultPermission: true,
  },
  permissions: [],
  run: async (interaction, client) => {
    interaction.reply(`Ping! ${interaction.client.ws.ping} ms`)
  },
}
