const { MessageActionRow, Modal, TextInputComponent } = require("discord.js")
const { facts } = require("../../db")
const ms = require("ms")

module.exports = {
  command: {
    name: "factcontrol",
    description: "Manage facts",
    defaultPermission: true,
    options: [
      {
        type: "STRING",
        name: "category",
        description: "Which fact category?",
        required: false,
        autocomplete: true,
      },
      {
        type: "STRING",
        name: "fact",
        description: "What is the fact?",
        required: false,
      },
    ],
  },
  permissions: [],
  run: async (interaction, client) => {
    if (!interaction.dbUser.perms.facts)
      return interaction.reply("You don't have permission to do that. Ask a mod to use /modmaster if you think you should.")

    let preC = interaction.options.get("category")?.value
    let preF = interaction.options.get("fact")?.value

    const modalId = `fact-add,${interaction.id}`

    let modal = new Modal().setTitle("Fact Creator").setCustomId(modalId)

    let categoryRow = new MessageActionRow().addComponents(
      new TextInputComponent()
        .setLabel("Category")
        .setPlaceholder("The category for the fact")
        .setRequired(true)
        .setCustomId("category")
        .setStyle("SHORT")
    )

    if(preC) categoryRow.components[0].setValue(preC)

    modal.addComponents(categoryRow)

    let fact

    let factRow = new MessageActionRow().addComponents(
      new TextInputComponent()
        .setRequired(true)
        .setLabel("Fact")
        .setPlaceholder("The fact, in all its glory")
        .setCustomId("fact")
        .setStyle("PARAGRAPH")
    )
    if (preF) {
        factRow.components[0].setValue(preF)
    }
    modal.addComponents(factRow)

    await interaction.showModal(modal)

    const filter = (interaction) => interaction.customId === modalId

    const modalReturned = await interaction.awaitModalSubmit({ filter, time: ms("2m") })

    if (!modalReturned) return

    await modalReturned.deferReply()

    category = modalReturned.fields.getTextInputValue("category").toLowerCase()
    fact = modalReturned.fields.getTextInputValue("fact")

    responseDb = new facts({ category, fact, guild: interaction.guild.id, createdBy: interaction.user.id })
    
    responseDb.save()
    let strSend = `A new fact has been added to the ${category} category!\n\`\`\`${fact}\`\`\``

    modalReturned.editReply(strSend)
  },
}
