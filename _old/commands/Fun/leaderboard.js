const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let data = re.dbs.levels.get(message.guild.id)
  let allPlayers = []
  for (let player in data) {
    let x = data[player]
    x.name = client.users.cache.get(player)?.tag || "Unknown User - " + x.id
    x.id = player
    allPlayers.push(x)
  }

  let sortedPlayers = allPlayers.sort((a, b) => {
    if (a.level < b.level) return 1
    else if (a.level > b.level) return -1
    if (a.xp < b.xp) return 1
    else if (a.xp > b.xp) return -1
  })

  let embeds = []

  for (var [i, player] of sortedPlayers.entries()) {
    let calc = re.func.xp(player.level, player.xp)
    if (i % 10 == 0) embeds.push(new re.Discord.MessageEmbed().setDescription(""))
    embeds[embeds.length - 1].description += `${i == 0 ? ":first_place: " : i == 1 ? ":second_place: " : i == 2 ? ":third_place: " : `\`${i + 1}\` `}${player.name}${player.id == message.author.id ? " (**you**)" : ""}${args[1] && args[0].toLowerCase() == "debug" ? ` (\`${player.id}\`)` : ""}\n> Level ${player.level} | ${player.xp || 0}/${calc.levelXP} XP\n\n`
  }

  for (var [i, embed] of embeds.entries()) {
    embed.setTitle(`Leaderboard (#${i * 10 + 1}-#${Math.min((i + 1) * 10, sortedPlayers.length)})`).setFooter(`Page ${i + 1}/${embeds.length} | Sorted in descending order`)
  }

  let m = await message.channel.send({ embeds: [embeds[0]] })
  re.paginator(message.author.id, m, embeds, 0)
}

module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: `See the leveling leaderboard for this server`,
  syntax: `${re.config.prefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias: ["lb", "levels"],
  module: `${__dirname.split(`/`).pop()}`,
  access: { level: 0 },
}
