module.exports = (client) => {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isSelectMenu()) return
    
    interaction.deferUpdate()
  })
}
