

module.exports = (client) => {
    client.on("interactionCreate", async (interaction) => {
        if(!interaction.isModalSubmit()) return

        

        let data = interaction.customId.split("-")
        let cmd = data[0]
        let args = data[1] || ""
        if (args) args = args.split(",")
    
        let modalFile = client.modals.get(cmd)

        if(!modalFile) return interaction.reply("Error")

        await modalFile(interaction, client, args)

        interaction.deferUpdate()
    })
}