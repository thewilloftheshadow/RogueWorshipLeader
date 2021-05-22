// const re = require(`./resources.js`).data
// module.exports.run = async (client, message, args) => {
//   if (!args[0] || ["add", "remove", "list"].includes(args[0])) args[0] == "list"
//   if (args[0] == "list" || !args[0]) {
//     let ar = re.dbs.resp.all()
//     ar.map(
//       (x) => `${x.ID} - ${x.data.response} (Created by <@${x.data.createdBy}>)`
//     )
//     message.channel.send(re.Discord.Util.cleanContent(ar.join(" "), message), {split: "\n"})
//   } else if (args[0] == "remove") {
//     let ar = re.dbs.resp.get(args[1])
//     if (!ar) return message.channel.send("That autoresponse doesn't exist!")
//     re.dbs.resp.delete(args[1])
//     message.channel.send(
//       `Autoresponse deleted:\n\`\`\`fix\n${args[1]} - ${ar.response} (Created by ${ar.createdBy})\n\`\`\``
//     )
//   } else if (args[0] == "add") {
//     let ar = re.dbs.resp.get(args[1])
//     if (ar) return message.channel.send("That autoresponse already exists!")
//     args.shift()
//     let trigger = args.shift()
//     console.log(trigger, args)
//     re.dbs.resp.set(trigger, {
//       response: args.join(" "),
//       createdBy: message.author.id,
//     })
//     message.channel.send(
//       `Autoresponse created:\n\`\`\`fix\n${trigger} - ${args
//         .splice(0, 2)
//         .join(" ")} (Created by ${message.author.id})\n\`\`\``
//     )
//   }
// }

// module.exports.help = {
//   name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
//   description: "Manage autoresponses",
//   syntax: `${re.config.prefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()} add <trigger> <response>
// ${re.config.prefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()} remove <trigger>
// ${re.config.prefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()} list`,
//   alias: ["ar"],
//   module: `${__dirname.split(`/`).pop()}`,
//   access: { level: 2 },
// }
