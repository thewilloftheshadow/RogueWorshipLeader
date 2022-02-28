const { MessageActionRow, Modal, TextInputComponent, MessageEmbed } = require("discord.js")
const { autoresponse } = require("../../db")
const { modmaster } = require("../../config")
const ms = require("ms")

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
    if (!interaction.member.roles.cache.has("791044221803954188") && !interaction.member.roles.cache.has("812746192081256461")) return interaction.reply("You do not have permission to use this command.")

    let preT = interaction.options.get("trigger")?.value
    let preResponseDb = await autoresponse.findOne({ trigger: preT, deleted: false })

    const modalId = `autoresponse-${interaction.options.get("add_or_remove").value},${interaction.id}`

    let modal = new Modal().setTitle("Autoresponse Editor").setCustomId(modalId)

    let triggerRow = new MessageActionRow().addComponents(
      new TextInputComponent()
        .setLabel("Trigger")
        .setPlaceholder("Trigger for the autoresponse")
        .setRequired(true)
        .setCustomId("trigger")
        .setStyle("SHORT")
    )

    if (preT) triggerRow.components[0].setValue(preT)

    modal.addComponents(triggerRow)

    let trigger, response

    if (interaction.options.get("add_or_remove").value == "add") {
      let responseRow = new MessageActionRow().addComponents(
        new TextInputComponent()
          .setRequired(true)
          .setLabel("Response")
          .setPlaceholder("Response to be sent")
          .setCustomId("response")
          .setStyle("PARAGRAPH")
      )
      if (preResponseDb) responseRow.components[0].setValue(preResponseDb.response)
      modal.addComponents(responseRow)

      await interaction.showModal(modal)

      const filter = (interaction) => interaction.customId === modalId

      const modalReturned = await interaction.awaitModalSubmit({ filter, time: ms("2m") })

      if (!modalReturned) return

      await modalReturned.deferReply()

      trigger = modalReturned.fields.getTextInputValue("trigger")
      response = modalReturned.fields.getTextInputValue("response")

      responseDb = await autoresponse.findOne({ trigger: preT })

      if (!responseDb) {
        responseDb = new autoresponse({ trigger, response, createdBy: interaction.user.id })
      } else {
        responseDb.response = response
        responseDb.editedBy = interaction.user.id
        responseDb.editedAt = Date.now()
      }

      responseDb.save()
      let strSend = `Autoresponse \`${trigger}\` has been ${
        interaction.options.get("add_or_remove").value == "add" ? "added" : "removed"
      }.\n\`\`\`${response}\`\`\``

      modalReturned.editReply(strSend)
    } else {
      if (!preT) return interaction.reply("You must specify a trigger to remove.")
      await autoresponse.updateOne({ trigger: preT }, { deleted: true, deletedBy: interaction.user.id })
      interaction.reply(`Autoresponse ${preT} has been removed.`)
    }
  },
}
