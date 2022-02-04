const re = require(`../resources.js`).data
re.client.on("messageCreate", async (message) => {
  //if (message.guild && message.guild.id != re.config.server) return
  let prefix = re.config.prefix
  if (!message.content.toLowerCase().startsWith(prefix.toLowerCase()) && message.guild) return
  if (re.config.blacklist.includes(message.author.id)) return await message.react("🙉")
  console.log(`${re.moment().format("MMMM Do YYYY, h:mm:ss a")} | ${message.author.tag} - ${message.content}`)
  message.author.botperms = await re.func.botperms(message.author.id, message)
  if(message.member) message.member.botperms = message.author.botperms
  message.re = re
  let args = message.content.slice(prefix.length).trim().split(/ /g)
  let command = args.shift().toLowerCase()
  if (command == "secretphrasetousefordmmessages" && message.guild) command = "WOOOOOOOT"
  if (command === "args") {
    return message.channel.send(`["${args.join(`", "`)}"]`, { code: "js" })
  }
  let commandfile = re.client.commands.get(command)
  if (!commandfile) return //message.channel.send("Command not found")
  if (message.author.bot && !commandfile.help.botcmd) return
  if ((!message.author.bot/* && !message.member.botperms.bypass*/) && commandfile.help.botcmd) return message.channel.send("Only bots can use this command!")

  let cmdaccess = commandfile.help.access
  if (!message.guild && !commandfile.help.access.dm) return
  if ((cmdaccess.level > message.member.botperms.level) && (!message.member.botperms.bypass)) {
    return message.channel.send(`Sorry! This command requires Level ${cmdaccess.level} permissions, but you only have Level ${message.member.botperms.level} permissions.`)
  }
  if (cmdaccess.eval && !message.member.botperms.eval) return message.channel.send(`Sorry! This command requires you to be the bot owner!`)

  try {
    await commandfile.run(re.client, message, args)
  } catch (err) {
    let embed = new re.Discord.MessageEmbed()
      .setDescription(`An error occured when ${message.author} (${message.author.id}) attempted the following command: \`${message.content.replace(/(`)/g, "$1")}\``)
      .addField("Error Description", `\`\`\`${err.stack}\`\`\``)
      .setColor("RED")
    await message.channel.send(`An error occurred when trying to execute this command. The developer has been notified.`)
    re.client.channels.cache.get(re.config.errors).send({content: "<@" + re.config.ownerID + ">", embeds: [embed]})
    console.error(err)
  }
})
