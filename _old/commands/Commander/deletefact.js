const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
    let allfact = re.dbs.facts.get(args[0])
    let fact = allfact.find(x => x.id == args[1])
    allfact = re.vars.pull(allfact, fact)
    re.dbs.facts.set(args[0], allfact)
    if(!fact) return message.channel.send(`A fact with the ID of ${fact.id} in the ${args[0]} command wasn't found!`)
    message.channel.send(`The following fact with the ID of ${fact.id} in the ${args[0]} command has been deleted\n\`\`\`${fact.text}\`\`\``)
};

module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: `Remove a fact from a fact command`,
  syntax: `${re.config.prefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()} <command> <id>`,
  alias: ["removefact"],
  module: `${__dirname.split(`/`).pop()}`,
  access: {level: 4}
}
