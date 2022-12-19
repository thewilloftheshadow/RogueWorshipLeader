const { autoreaction } = require("../../db")

module.exports = {
  command: {
    name: "autoreaction",
    description: "Manage autoreactions",
    defaultPermission: true,
    options: [
      {
        type: "STRING",
        name: "add_or_remove",
        description: "Add or remove an autoreaction",
        required: true,
        choices: [
          { name: "Add", value: "add" },
          { name: "Remove", value: "remove" },
        ],
      },
      {
        type: "STRING",
        name: "trigger",
        description: "Which autoreaction trigger?",
        required: false,
      },
      {
        type: "STRING",
        name: "custom_emoji_id",
        description: "If using a custom emoji, provide the ID of the emoji.",
        required: false,
      },
      {
        type: "STRING",
        name: "unicode_emoji",
        description: "If using a unicode emoji, provide the emoji.",
        required: false,
      },
    ],
  },
  permissions: [],
  run: async (interaction, client) => {
    if (!interaction.dbUser.perms.autoresponse)
      return interaction.reply("You don't have permission to do that. Ask a mod to use /modmaster if you think you should.")

    let addOrRemove = interaction.options.get("add_or_remove").value
    let trigger = interaction.options.get("trigger")?.value
    let customEmojiId = interaction.options.get("custom_emoji_id")?.value
    let unicodeEmoji = interaction.options.get("unicode_emoji")?.value

    if (!trigger) return interaction.reply("You must provide a trigger.")
    switch (addOrRemove) {
      case "add":
        if (customEmojiId && unicodeEmoji) return interaction.reply("You can only use one type of emoji.")
        if (!customEmojiId && !unicodeEmoji) return interaction.reply("You must provide an emoji.")
        let set = {
          trigger,
          guild: interaction.guild.id,
          deleted: false,
          deletedBy: null,
          createdBy: interaction.user.id,
          createdAt: Date.now(),
        }
        if (customEmojiId) set.customEmojiId = customEmojiId
        if (unicodeEmoji) set.unicodeEmoji = unicodeEmoji
        await autoreaction.create(set)
        interaction.reply(`Autoreaction ${trigger} has been added.`)
        break
      case "remove":
        await autoreaction.updateOne({ trigger, guild: interaction.guild.id }, { deleted: true, deletedBy: interaction.user.id })
        interaction.reply(`Autoreaction ${trigger} has been removed.`)
        break
    }
  },
}
