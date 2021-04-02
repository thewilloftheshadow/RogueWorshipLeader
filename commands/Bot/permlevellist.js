const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let embed = new re.Discord.MessageEmbed()
  .setTitle("Permission Levels:")
  .addField("Level 1", re.vars.botperms[1])
  .addField("Level 2", re.vars.botperms[2])
  .addField("Level 3", re.vars.botperms[3])
  .addField("Level 4", re.vars.botperms[4])
  message.channel.send(embed)
};


module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: `List the permission levels`,
  syntax: `${re.config.prefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias: ["pll"],
  module: `${__dirname.split(`/`).pop()}`,
  access: {level: 0}
}
