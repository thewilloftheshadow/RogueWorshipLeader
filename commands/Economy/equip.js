const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let [type, item, user, data] = args
  data = JSON.parse(data)
  data.id = item

  switch (type) {
    case "duel":
      let old = re.dbs.economy.get(`${message.guild.id}.${user}.duelBoost`)
      console.log(old)
      if(old) message.channel.send(`You have replaced your ${old.id} with ${old.durability} durability!`)
      re.dbs.economy.set(`${message.guild.id}.${user}.duelBoost`, data)
      message.channel.send(`Your ${item} with ${data.durability} durability has been successfully equipped for your next battle!`)
      message.delete()
      break;
  
    default:
      message.channel.send("Unable to process equip, please try again later. Contact Shadow for a refund")
      break;
  }
}

module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: "Equip an item to your inventory",
  syntax: `${re.config.prefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias: ["equipitem"],
  module: `${__dirname.split(`/`).pop()}`,
  access: { level: 0 },
  botcmd: true,
  nohelp: true,
}
