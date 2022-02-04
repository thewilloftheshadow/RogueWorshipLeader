const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  message.delete()
  let [cmd, userid, amount, location, response] = args
  args.shift()
  args.shift()
  args.shift()
  args.shift()
  response = args.join(" ")
  if(message.mentions.members.first()) userid = message.mentions.members.first().id
  console.log(cmd, userid, amount, location, response)
  amount = parseInt(amount)
  if(!amount) {
      let param = {reason: `Trigger command from ${message.author.tag}: \`${message.content}\``}
      param[location] = amount
      console.log(param)
    //throw new TypeError("Amount must be a valid non-0 integer")
  }
  else{
  if(!["cash", "bank"].includes(location)) throw new TypeError("Location must be either bank or cash")

  let param = {reason: `Trigger command from ${message.author.tag}: \`${message.content}\``}

  switch (cmd) {
    case "add":
        param[location] = amount
        console.log(param)
        re.unb.editUserBalance(message.guild.id, userid, param)
        break;

    case "remove":
        param[location] = 0 - amount
        re.unb.editUserBalance(message.guild.id, userid, param)
        break;
  
    default:
      message.channel.send("Unable to process trigger")
      break;
    }
  }
  message.channel.send(response)
}

module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: "Run a command in unb",
  syntax: `${re.config.prefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias: [],
  module: `${__dirname.split(`/`).pop()}`,
  access: { level: 0 },
  botcmd: true,
  nohelp: true,
}
