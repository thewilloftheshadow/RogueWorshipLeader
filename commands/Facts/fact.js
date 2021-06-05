const re = require(`../../resources.js`).data
let f = re.dbs.facts.all()
let cmds = f.map((x) => x.ID)
let cmdslist = f.map((x) => {
	let as = re.dbs.facts.get(x.ID)
	return `${x.ID} - ${as.length} facts`
})

cmds.forEach(x => {
	let generate = {
	run: async (client, message, args) => {
		let f = re.dbs.facts.get(x)
		let i = re.func.getRandom(0, f.length)
		console.log(i)
		let fact = f[i]
		message.channel.send(new re.Discord.MessageEmbed().setTitle("True story...").setThumbnail(message.guild.iconURL()).setDescription(fact.text).setFooter(`ID: ${fact.id}`).setColor(re.vars.randomColor().hexString()))
	},
		help: {
			name: `${x}`,
			description: `Get a random ${x} fact`,
			syntax: `${re.config.prefix}${x}`,
			alias: [],
			module: `${__dirname.split(`/`).pop()}`,
			access: { level: 0 },
		},
	}
	
	re.client.commands.set(x, generate)
})



module.exports.run = async (client, message, args) => {
	if(!args[0]) return message.channel.send(`Current fact commands:\n\`\`\`${re.config.prefix}${cmdslist.join("\n" + re.config.prefix)}\`\`\``)
	let category = re.dbs.facts.get(args[0])
	if(!category) return message.channel.send("Unknown fact command! Use this command without any arguments to see all the fact commands")
	let fact = category.find(x => x.id == args[1])
	if(!category) return message.channel.send("Unknown fact!")
	message.channel.send(new re.Discord.MessageEmbed().setTitle("True story...").setThumbnail(message.guild.iconURL()).setDescription(fact.text).setFooter(`ID: ${fact.id}`).setColor(re.vars.randomColor().hexString()))
}
module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: `See all the available fact commands`,
  syntax: `${re.config.prefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias: ["allfacts"],
  module: `${__dirname.split(`/`).pop()}`,
  access: { level: 0 },
}
