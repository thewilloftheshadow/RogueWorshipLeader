const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const { users } = require("../../db")
const { modmaster } = require("../../config")
const { formatConfig } = require("../../fn")

const { sel, permissions } = modmaster

module.exports = {
  command: {
    name: "modmaster",
    description: "I wonder what this does...",
    defaultPermission: true,
    options: [
      {
        type: "USER",
        name: "user",
        description: "The user to adjust settings for",
        required: true,
      },
      {
        type: "STRING",
        name: "selector",
        description: "What would you like to adjust?",
        required: true,
        choices: sel,
      },
    ],
  },
  permissions: [],
  run: async (interaction, client) => {
    if (!interaction.member.roles.cache.has("791044221803954188")) return interaction.reply("You do not have permission to use this command.")

    let user = interaction.options.get("user")?.user
    let selector = interaction.options.get("selector")?.value

    console.log(interaction.options, selector, sel.find((x) => x.value == selector), sel)

    let embed = new MessageEmbed()
      .setTitle("ModMaster")
      .setImage("https://routerjockey.com/wp-content/uploads/2017/02/Matrix-code-gif.gif")
      .setColor(0x20c20e)

      .addField(`**Controlled User**`, `${user ? user.tag : "Yourself"} - ${user.id}`, true)
      .addField(`**Selector**`, `${sel.find((x) => x.value == selector)?.name ?? "Error"}`, true)

    let userDb = await users.findOne({ user: user.id }).exec()
    if (!userDb) userDb = await new users({ user: user.id }).save()

    embed.addField(`Current User Data`, formatConfig(userDb))

    let row = new MessageActionRow()

    switch (selector) {
      case "pinggif":
        embed.addField("Instructions", "Press the button below to set the user's ping gif.")
        row.addComponents(new MessageButton().setCustomId(`openModal-pingGif,${user.id}`).setLabel("Edit Ping GIf").setStyle("DANGER"))
        break

      case "perms":
        embed.addField("Instructions", "Use the buttons below to control the permissions of the controlled user. Press save when you are done.")
        permissions.forEach((p) => {
          let button = new MessageButton()
            .setCustomId(`permToggle-${p.value},${interaction.user.id}`)
            .setLabel(`${p.name}`)
            .setStyle(userDb.perms[p.value] ? "SUCCESS" : "DANGER")
          row.addComponents(button)
        })
        row.addComponents(new MessageButton().setLabel("Save").setStyle("SECONDARY").setCustomId(`disableAll-${interaction.user.id}`))
        

      default:
        break
    }

    await interaction.dbUser.save()

    let toSend = { embeds: [embed], ephemeral: false }

    if (row.components.length > 0) toSend.components = [row]

    interaction.reply(toSend)
  },
}
