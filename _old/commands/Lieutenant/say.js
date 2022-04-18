const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  message.delete().catch(()=>{}) // delete the command
    let m = await message.channel.messages.fetch(args[0]).catch(()=>{}) // see if there is a message with the ID of the first argument of the command
    if (m) { // if there is a message
      args.shift() // remove the ID from the arguments
      m.reply(args.join(" ")) // send the arguments joined with a space
    } else { // if there isn't a message
      message.channel.send(args.join(" ")) // send the arguments joined with a space
    }
};

module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: "Says a message as the bot",
  syntax: `${re.config.prefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()} <message>`,
  alias: ["copy"],
  module: `${__dirname.split(`/`).pop()}`,
  access: {level: 2}
}