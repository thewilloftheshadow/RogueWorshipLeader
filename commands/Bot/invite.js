const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  message.channel.send("<https://discord.com/oauth2/authorize?client_id=542547515384528917&permissions=4294967295&scope=bot%20applications.commands>")
}

module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: `Get a link to invite the bot`,
  syntax: `${re.config.prefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias: ["add"],
  module: `${__dirname.split(`/`).pop()}`,
  access: { level: 0 },
}
