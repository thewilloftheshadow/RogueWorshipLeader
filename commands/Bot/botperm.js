const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let user = re.func.getuser(args.join(" "), message)
  if (!user) return message.channel.send("User not found")
  let bp = re.func.botperms(user.id, message)
  // message.channel.send(JSON.stringify(re.func.botperms(user.id, message), null, 4), {"code": "fix"})
  let embed = new re.Discord.MessageEmbed()
      .setTitle(user.user.tag + "'s Permissions")
      .setDescription(`Permission Level: ${bp.level} - ${user.user.bot ? "Bot" : re.vars.botperms[bp.level]}`)
  if(bp.eval) embed.description += `\nBot Owner`
  if(bp.bypass) embed.description += `\nBypasses all permissions`
  message.channel.send(embed)
}

module.exports.help = {
    name:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
    description:`Check botperms`,
    syntax:`${re.config.prefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()} <user>`,
    alias:["bp", "botperms"],
    module:`${__dirname.split(`/`).pop()}`,
    access: {level: 0}
}