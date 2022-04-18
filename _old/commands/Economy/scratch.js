const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let [userid] = args

  let prizes = [100, 0, 200, 500, 1000, 250, 0, 0, 0]
  re.vars.shuffle(prizes)
  let buttons = []
  let rows = []
  prizes.forEach((x, i) => buttons.push(new re.Discord.MessageButton().setStyle("SECONDARY").setLabel(`${x}`).setCustomId(`${userid}=scratch;${x};${i}`)))
  rows.push(new re.Discord.MessageActionRow().addComponents(buttons[0], buttons[1], buttons[2]))
  rows.push(new re.Discord.MessageActionRow().addComponents(buttons[3], buttons[4], buttons[5]))
  rows.push(new re.Discord.MessageActionRow().addComponents(buttons[6], buttons[7], buttons[8]))

  message.channel.send({content: "Scratch and win!", components: rows})
}

module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: "Use a scratch card",
  syntax: `${re.config.prefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias: [],
  module: `${__dirname.split(`/`).pop()}`,
  access: { level: 0 },
  botcmd: true,
  nohelp: true,
}
