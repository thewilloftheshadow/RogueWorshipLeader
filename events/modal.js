module.exports = (client) => {
    client.on("interactionCreate", async (interaction) => {
        if(!interaction.isModalSubmit()) return

        console.log(interaction)
    })
}