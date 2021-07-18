module.exports.run = async (client, message, args) => {
  const re = message.re

  let command = args[0]
  let showall = false
  if (command === "all") {
    command = null
    showall = true
  }
  let commands = []
  if (!command) {
    let embed = new re.Discord.MessageEmbed().setTitle(`Commands for ${client.user.username}`).setAuthor(message.author.tag, message.author.avatarURL()).setColor(re.config.color).setFooter(`Use the command ${re.config.prefix}help <command> to get more info on a specific command!`)
    let modulecommands = []
    await re.config.modules.forEach(async (module) => {
      let modulecommandarray = []
      let modulecommands = ""
      client.commands.forEach((command) => {
        if (command.help.module === module && !command.help.nohelp) {
          if (!modulecommandarray.find((c) => c == command.help.name)) {
            modulecommandarray.push(command.help.name)
            cantuse = false
            if (message.author.botperms.level < command.help.access.level) cantuse = true
            if (command.help.access.eval && !message.author.botperms.eval) cantuse = true
            if (!cantuse || (!cantuse && !showall)) modulecommands += `${cantuse ? "~~" : ""}\\${re.config.prefix}${command.help.name}${cantuse ? "~~" : ""}\n`
          }
        }
      })
      if (modulecommands.length > 0) await embed.addField(`**${re.func.capitalizeFirstLetter(module)}:**`, modulecommands, true)
    })
    //embed.addField("Note:", `${showall ? `If a command is crossed out, you do not have access to use it` : `Use \`${re.config.prefix}help all\` to see all commands, even those you don't have access to`}\nUse the command \`${re.config.prefix}help <command>\` to get more info on a specific command!`)
    message.channel.send(embed)
  } else {
    let props = client.commands.get(command)
    if (!props || props.help.name == "secretphrasetousefordmmessages") return message.channel.send("Sorry, I couldn't find that command")
    let embed = new re.Discord.MessageEmbed()
    embed.setTitle(`Command info for ${command}`)
    embed.setAuthor(message.author.tag, message.author.avatarURL())
    embed.setColor(re.config.color)
    embed.fields = [
      {
        name: `Description:`,
        value: `${props.help.description}`,
      },
      {
        name: `Syntax:`,
        value: `\`${props.help.syntax.startsWith(re.config.prefix) ? "" : re.config.prefix}${props.help.syntax}\``,
      },
      {
        name: `Required Permission Level:`,
        value: `${props.help.access.eval ? "Developer" : `${props.help.access.level} - ${re.vars.botperms[props.help.access.level]}`}`,
      },
    ]
    if (props.help.alias && props.help.alias.length > 0)
      embed.fields.push({
        name: `Aliases:`,
        value: `\`${re.config.prefix}${props.help.alias.join("`, `" + re.config.prefix)}\``,
      })
    message.channel.send({ embeds: [embed] })
  }
}

module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: `Get help for any command, or list all commands`,
  syntax: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()} <command>`,
  alias: ["command", "h"],
  module: `${__dirname.split(`/`).pop()}`,
  access: { level: 0 },
}
