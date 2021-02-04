const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let c = message.mentions.channels.first()
  if(!c) return message.reply("Please specify an OWS channel to end by mentioning it!")
  let id = c.id
  let ows = re.dbs.ows.get(id)
  if(!re.config.ows.includes(id)) return message.reply("That channel isn't an OWS channel!")
  re.dbs.ows.set(id + ".ended", true)
  message.reply("Ending the one word story now")
  c.send("The One Word Story has ended!")
  message.channel = c
  re.client.commands.get("ows").run(re.client, message, args);
};

module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: "End the one word story",
  syntax: `${re.config.prefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias: ["owsend"],
  module: `${__dirname.split(`/`).pop()}`,
  access: {level: 2}
}