const { MessageEmbed } = require("discord.js")
const sel = [
    { name: "Permissions", value: "perms" },
    { name: "Ping Gif", value: "ping-gif" },
  ]

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

    let modMaster = new MessageEmbed()
      .setTitle("ModMaster")
      .setImage("https://routerjockey.com/wp-content/uploads/2017/02/Matrix-code-gif.gif")
      .setColor(0x20c20e)

      .addField(`**Controlled User**`, `${user ? user.tag : "Yourself"} - ${user.id}`, true)
      .addField(`**Selector**`, `${sel.find(x => x.value == selector).name}`, true)

    switch (selector) {
        case "ping-gif":
            modMaster.addField("Instructions", "Do nothing, more coming soon")
            break;

        case "perms":
            modMaster.addField("Instructions", "Use the buttons below to control the permissions of the controlled user. Press save when you are done.")
    
        default:
            break;
    }

    await interaction.dbUser.save()

    interaction.reply({ embeds: [modMaster] })
  },
}
