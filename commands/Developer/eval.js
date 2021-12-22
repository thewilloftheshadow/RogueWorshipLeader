const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  
    try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      message.channel.send(re.func.clean(evaled), {code:"xl", "split": " "});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${re.func.clean(err)}\n\`\`\``);
    }
};


module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: "Execute some code",
  syntax: `${re.config.prefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias: ["execute"],
  module: `${__dirname.split(`/`).pop()}`,
  access: {eval: true}
}


const dropCash = () => {
  return "Heh, you tried"
}
