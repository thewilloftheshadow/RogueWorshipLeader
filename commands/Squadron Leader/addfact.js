const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
    let cmd = args[0]
    args.shift()
    let fact = args.join(" ")
    let id = re.func.randomString(8)
    let array = re.dbs.facts.get(cmd)
    if(!array) array = []
    array.push({"text": fact, "id": id})
    re.dbs.facts.set(cmd, array)
    let embed = new re.Discord.MessageEmbed().setTitle(`New Fact has been added to the \`${re.config.prefix}${cmd}\` command`).setDescription(`\`\`\`${fact}\`\`\``).setFooter(`ID: ${id}`)
    message.channel.send(embed)
};

module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: `Add a fact to a fact command`,
  syntax: `${re.config.prefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()} <fact ID>`,
  alias: ["newfact"],
  module: `${__dirname.split(`/`).pop()}`,
  access: {level: 3}
}
