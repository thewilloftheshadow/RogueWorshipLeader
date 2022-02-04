const {disableButtons} = require("../config/fn")

module.exports = async (interaction, client, args) => {
    let x = disableButtons(interaction.message)
    interaction.message.edit(x)
    interaction.deferUpdate()

}