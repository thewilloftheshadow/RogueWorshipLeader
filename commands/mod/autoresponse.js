const { MessageActionRow, Modal, TextInputComponent } = require("discord.js")
const { autoresponse } = require("../../db")
const { modmaster } = require("../../config")

module.exports = {
  command: {
    name: "autoresponse",
    description: "Manage autoresponses",
    defaultPermission: true,
    options: [
      {
        type: "STRING",
        name: "add_or_remove",
        description: "Add or remove an autoresponse",
        required: true,
        choices: [
          { name: "Add", value: "add" },
          { name: "Remove", value: "remove" },
        ],
      },
      {
        type: "STRING",
        name: "trigger",
        description: "Which autoresponse trigger?",
        required: false,
      },
    ],
  },
  permissions: [],
  run: async (interaction, client) => {
    if (!interaction.member.roles.cache.has("791044221803954188")) return interaction.reply("You do not have permission to use this command.")

    let preT = interaction.options.get("trigger")?.value
    let responseDb = await autoresponse.findOne({ trigger: preT })

    let modal = new Modal().setTitle("Autoresponse Editor").setCustomId(`autoresponse-${interaction.options.get("add_or_remove").value}`)

    let trigger = new MessageActionRow().addComponents(
      new TextInputComponent()
        .setLabel("Trigger")
        .setPlaceholder("Trigger for the autoresponse")
        .setRequired(true)
        .setCustomId("trigger")
        .setStyle("SHORT")
    )

    if (preT) trigger.components[0].setValue(preT)

    modal.addComponents(trigger)

    if (interaction.options.get("add_or_remove").value == "add") {
      let response = new MessageActionRow().addComponents(
        new TextInputComponent().setRequired(true).setLabel("Response").setPlaceholder("Response to be sent").setCustomId("response").setStyle("PARAGRAPH")
      )
      if (responseDb) response.components[0].setValue(responseDb.response)
      modal.addComponents(response)
    }

    interaction.showModal(modal)
  },
}
