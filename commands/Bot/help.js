const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const { support } = require("../../config")

module.exports = {
  command: {
    name: "help",
    description: "See how to use the bot",
    defaultPermission: true,
  },
  permissions: [],
  run: async (interaction, client) => {
    let embed = new MessageEmbed()
      .setTitle(`${client.user.username} Help`)
      // .setDescription(
      //   `${interaction.l10n("helpDescription")}
      // **${interaction.l10n("commands")}**
      // \`/setup\` - ${interaction.l10n("cmdDescriptionSetup")}
      // \`/play\` - ${interaction.l10n("cmdDescriptionPlay")}
      // \`/feed\` - ${interaction.l10n("cmdDescriptionFeed")}
      // \`/inventory\` - ${interaction.l10n("cmdDescriptionInventory")}
      // \`/vote\` - ${interaction.l10n("cmdDescriptionVote")}
      // \`/help\` - ${interaction.l10n("cmdDescriptionHelp")}
      // \`/narwhal\` - ${interaction.l10n("cmdDescriptionNarwhal")}
      // \`/config\` - ${interaction.l10n("cmdDescriptionConfig")}
      // \`/redeem\` - ${interaction.l10n("cmdDescriptionRedeem")}
      // \`/open\` - ${interaction.l10n("cmdDescriptionOpen")}
      // \`/item\` - ${interaction.l10n("cmdDescriptionItem")}
      // \`/buy\` - ${interaction.l10n("cmdDescriptionBuy")}`
      // )
      .setDescription("Coming soon")
      .setColor("#abc123")
      .setThumbnail(client.user.avatarURL())

    let row = new MessageActionRow()
    row
      .addComponents(new MessageButton().setStyle("LINK").setURL(`https://${support}`).setLabel("Main Server"))
      .addComponents(
        new MessageButton()
          .setStyle("LINK")
          .setURL(`https://discord.com/oauth2/authorize?client_id=542547515384528917&permissions=4294967295&scope=bot%20applications.commands`)
          .setLabel("Invite the Bot")
      )

    interaction.reply({ embeds: [embed], components: [row] })
  },
}
