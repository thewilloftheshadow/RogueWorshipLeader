const { users } = require("../../db")
const pull = require("array-pull")
const { ids } = require("../../config")

module.exports = {
  command: {
    name: "flags",
    description: "Adjust user flags",
    defaultPermission: true,
    adminGuild: true,
    options: [
      {
        type: "USER",
        name: "user",
        description: "The user ID you want to get info for.",
        required: true,
      },
      {
        type: "STRING",
        name: "type",
        description: "Action to use",
        required: true,
        choices: [
          { name: "Add", value: "add" },
          { name: "Remove", value: "remove" },
          { name: "View", value: "view" },
        ],
      },
      {
        type: "STRING",
        name: "flag",
        description: "Flag to use",
        required: true,
      },
    ],
  },
  run: async (interaction, client) => {
    if (!interaction.dbUser.flags.includes("STAFF") && !ids.devs.includes(interaction.user.id)) return interaction.reply({ content: "You do not have permission to use this command.", ephemeral: true })

    let id = interaction.options.get("user")?.value
    let action = interaction.options.get("type")?.value
    let flag = interaction.options.get("flag")?.value
    let user = await client.users.fetch(id)
    let userData = await users.findOne({ user: id })

    if (action == "add") {
      userData.flags.push(flag)
    } else if (action == "remove") {
      pull(userData.flags, flag)
    }

    interaction.reply(`${user ? user.tag : id} has the following flags:\n\`\`\`${userData.flags?.length > 0 ? userData.flags : "[]"}\`\`\``)
    userData.save()
  },
}
