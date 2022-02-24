const { Modal, TextInputComponent, MessageActionRow } = require("discord.js")
const { users } = require("../db")

module.exports = async (interaction, client, args) => {
  let [modalType, userId] = args

  let userDb = await users.findOne({ user: userId }).exec()

  const modal = new Modal().setCustomId(`pingGif-${userId}`)

  if (modalType == "pingGif") {
    let pingGifText = new TextInputComponent().setCustomId(`pingGif`).setPlaceholder("GIF URL").setRequired(true).setLabel("Ping GIF").setStyle("SHORT")

    if (userDb.pingGif) pingGifText.setValue(userDb.pingGif)

    modal.setTitle("Ping GIF Editor").addComponents(new MessageActionRow().addComponents(pingGifText))
  }

  interaction.showModal(modal)
  
}
