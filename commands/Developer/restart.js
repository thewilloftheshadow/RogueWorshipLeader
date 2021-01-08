const re = require(`../../resources.js`).data
const cmd = require("node-cmd")
module.exports.run = async (client, message, args) => {
  re.dbs.temp.set("rebootchan", message.channel.id)
  message.react("✅")
  client.user.setStatus('offline')
  cmd.run("refresh")
};

module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: `Reboot the bot`,
  syntax: `${re.func.getPrefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias: ["reboot"],
  module: `${__dirname.split(`/`).pop()}`,
  access: {eval: true}
}