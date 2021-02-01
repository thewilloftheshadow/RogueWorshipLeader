const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {

    let m = await message.channel.send("One moment please...")
    let role = message.guild.roles.cache.find(r => r.name === args.join(" "))
    if(!role) role = message.mentions.roles.first()
    if(!role) role = message.guild.roles.cache.get(args[0])
    if(!role) return m.edit("That role doesn't exist smh")
    let members = message.guild.members.cache.filter(m => m.roles.cache.find(r => r.name === role.name))
    let memmsg = `${members.map(m => m.user).join("\n")}`
    if(memmsg.length > 2000) memmsg = "Member list exceeded max message length"
    m.edit(memmsg, new re.Discord.MessageEmbed().setDescription("Found a total of " + members.size + " members with the " + role.name + " role"))
};


module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: "List members in a role",
  syntax: `${re.config.prefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()} <role>`,
  alias: ["inrole"],
  module: `${__dirname.split(`/`).pop()}`,
  access: {level: 2}
}