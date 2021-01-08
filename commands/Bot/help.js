const re = require(`../../resources.js`).data

module.exports.run = async (client, message, args) => {
  let command = args[0];
  let commands = [];
  if (!command){
    return message.channel.send("Seeing help for all commands is currently disabled, to return soon!")
    let embed = new re.Discord.MessageEmbed()
    .setTitle(`Commands for ${client.user.username}`)
    .setAuthor(message.author.tag, message.author.avatarURL())
    .setColor(re.config.color)
    let modulecommands = []
    // client.commands.forEach(command => {
    //   if(command.help.module === "bot"){
    //     if(!modulecommands.find(c => c == command.help.name)){
    //       modulecommands.push(command.help.name)
    //     }
    //   }
    // })
    // let serverprefix = re.dbs.settings.get(message.guild.id+".prefix") || re.config.prefix
    // embed.addField(`**Bot:**`, `${serverprefix}${modulecommands.join("\n" + serverprefix)}`, true)
    await re.config.modules.forEach(async module => {
      let modulecommandarray = []
      let modulecommands = ""
      client.commands.forEach(command => {
        if(command.help.module === module && !command.help.nohelp){
          if(!modulecommandarray.find(c => c == command.help.name)){
            modulecommandarray.push(command.help.name)
            modulecommands += `**${re.config.prefix}${command.help.name}**\n - ${command.help.description}\n`
          }
        }
      })
      let serverprefix = re.config.prefix
      if(module == "bot" && modulecommands.length > 0) await embed.addField(`**${re.func.capitalizeFirstLetter(module)}:**`, modulecommands)
      if(module == "utility && modulecommands.length > 0") await embed.addField(`**${re.func.capitalizeFirstLetter(module)}:**`, modulecommands)
      if(module == "fun" && modulecommands.length > 0) await embed.addField(`**${re.func.capitalizeFirstLetter(module)}:**`, modulecommands)
      if(module == "mod" && message.member.roles.cache.get("694962620914204672")  && modulecommands.length > 0) await embed.addField(`**${re.func.capitalizeFirstLetter(module)}:**`, modulecommands)
      if(module == "economy" && modulecommands.length > 0) await embed.addField(`**${re.func.capitalizeFirstLetter(module)}:**`, modulecommands)
      if(module == "war" && modulecommands.length > 0) await embed.addField(`**${re.func.capitalizeFirstLetter(module)}:**`, modulecommands)
      if(module == "economymanager" && message.member.roles.cache.get("710614561668989018") && modulecommands.length > 0) await embed.addField(`**${re.func.capitalizeFirstLetter(module)}:**`, modulecommands)
      if(module == "factions" && modulecommands.length > 0) await embed.addField(`**${re.func.capitalizeFirstLetter(module)}:**`, modulecommands)
      if(module == "staff" && message.member.roles.cache.get("712070389815312385") && modulecommands.length > 0) await embed.addField(`**${re.func.capitalizeFirstLetter(module)}:**`, modulecommands)
      if(module == "dev" && message.author.id === re.config.ownerID && modulecommands.length > 0) await embed.addField(`**${re.func.capitalizeFirstLetter(module)}:**`, modulecommands)
    })
    
    await re.config.tckcmodules.forEach(async module => {
      let modulecommandarray = []
      let modulecommands = ""
      client.commands.forEach(command => {
        if(command.help.module === module && !command.help.nohelp){
          if(!modulecommandarray.find(c => c == command.help.name)){
            modulecommandarray.push(command.help.name)
            modulecommands += `**${re.config.prefix}${command.help.name}**\n - ${command.help.description}\n`
          }
        }
      })
      if(message.guild.id != re.config.server) return
      let serverprefix = re.config.prefix
      if(module == "bot" && modulecommands.length > 0) await embed.addField(`**${re.func.capitalizeFirstLetter(module)}:**`, modulecommands)
      if(module == "utility && modulecommands.length > 0") await embed.addField(`**${re.func.capitalizeFirstLetter(module)}:**`, modulecommands)
      if(module == "fun" && modulecommands.length > 0) await embed.addField(`**${re.func.capitalizeFirstLetter(module)}:**`, modulecommands)
      if(module == "mod" && message.member.roles.cache.get("694962620914204672")  && modulecommands.length > 0) await embed.addField(`**${re.func.capitalizeFirstLetter(module)}:**`, modulecommands)
      if(module == "economy" && modulecommands.length > 0) await embed.addField(`**${re.func.capitalizeFirstLetter(module)}:**`, modulecommands)
      if(module == "war" && modulecommands.length > 0) await embed.addField(`**${re.func.capitalizeFirstLetter(module)}:**`, modulecommands)
      if(module == "economymanager" && message.member.roles.cache.get("710614561668989018") && modulecommands.length > 0) await embed.addField(`**${re.func.capitalizeFirstLetter(module)}:**`, modulecommands)
      if(module == "factions" && modulecommands.length > 0) await embed.addField(`**${re.func.capitalizeFirstLetter(module)}:**`, modulecommands)
      if(module == "staff" && message.member.roles.cache.get("712070389815312385") && modulecommands.length > 0) await embed.addField(`**${re.func.capitalizeFirstLetter(module)}:**`, modulecommands)
      if(module == "dev" && message.author.id === re.config.ownerID && modulecommands.length > 0) await embed.addField(`**${re.func.capitalizeFirstLetter(module)}:**`, modulecommands)
    })
    
    message.channel.send(embed)
  }
  else{
    let props = client.commands.get(command);
    if (!props || props.help.name == "secretphrasetousefordmmessages")
      return message.channel.send("Sorry, I couldn't find that command");
    let embed = new re.Discord.MessageEmbed()
      embed.setTitle(`Command info for ${command}`)
      embed.setAuthor(message.author.tag, message.author.avatarURL())
      embed.setColor(re.config.color)
      embed.fields = [
        {
          name:`Description:`, 
          value:`${props.help.description}`
        },
        {
          name:`Syntax:`, 
          value:`\`${props.help.syntax.replace("jejprefixjej", re.dbs.settings.get(message.guild.id+".prefix") || re.config.prefix)}\``
        },
        // {
        //   name:`Module:`, 
        //   value:`${props.help.module}`
        // },
        {
          name:`Required ${props.help.access.mm ? "MM Permission" : "Permission Level"}:`, 
          value:`${props.help.access.mm ? props.help.access.mm : `${props.help.access.level} - ${re.vars.botperms[props.help.access.level]}`}`
        }
      ]
    if (props.help.alias && props.help.alias.length > 0)
      embed.fields.push({
        name: `Aliases:`,
        value: `\`${re.dbs.settings.get(message.guild.id+".prefix") || re.config.prefix}${props.help.alias.join("`, `" + re.dbs.settings.get(message.guild.id+".prefix") || re.config.prefix)}\``
});
    message.channel.send(embed);
  }
};


module.exports.help = {
    name:`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
    description:`Get help for any command, or list all commands`,
    syntax:`${re.func.getPrefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()} <command>`,
    alias:["command"],
    module:`${__dirname.split(`/`).pop()}`,
    access: {level: 0}
}