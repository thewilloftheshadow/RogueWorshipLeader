const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  message.channel.send("https://media.discordapp.net/attachments/791046776982863884/845146870384295936/image0.png")
}

module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: `I am once again showing you the description of this command`,
  syntax: `${re.config.prefix}${__filename
    .split(`${__dirname}/`)
    .pop()
    .split(`.`)
    .shift()}`,
  alias: ["onceagainr2"],
  module: `${__dirname.split(`/`).pop()}`,
  access: { level: 0 },
}
