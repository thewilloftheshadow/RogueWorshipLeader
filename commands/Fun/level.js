const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let guy = await re.func.getuser(args.join(" "), message)
  if(!guy) guy = message.member
  if(guy.user.bot) return message.channel.send("Bots don't have ranks smh")
  let data = re.dbs.levels.get(`${message.guild.id}.${guy.id}`)
  if(!data) {
    re.dbs.levels.set(`${message.guild.id}.${guy.id}`, {xp: 0, level: 1})
    data = {xp: 0, level: 1}
  }
  let calc = re.func.xp(data.level, data.xp)
  let embed = new re.Discord.MessageEmbed()
  .setTitle(`${guy.displayName}'s Rank`)
  .setThumbnail(guy.user.displayAvatarURL())
  .setColor(guy.displayHexColor)
  .setDescription(`<@${guy.id}>`)
  .addField("Level", `${data.level}`, true)
  .addField("XP", `${data.xp}/${calc.levelXP}`, true)
  .setFooter(`${calc.remainingXP} XP remaining`)
  .setTimestamp()
  message.channel.send({embeds: [embed]})
}

module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: `See your current level`,
  syntax: `${re.config.prefix}${__filename
    .split(`${__dirname}/`)
    .pop()
    .split(`.`)
    .shift()}`,
  alias: ["rank"],
  module: `${__dirname.split(`/`).pop()}`,
  access: { level: 0 },
}
