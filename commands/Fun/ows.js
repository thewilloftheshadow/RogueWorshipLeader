const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  if (!message.guild.id == config.server) return message.channel.send("This command is only for the RogueWorshipLeader server!")
  let channel = re.config.ows[0] // TODO: support multiple ows
  let story = re.vars.tscwd(re.dbs.ows.get(`${channel}.words`).join(" "))
  story.replace("```css", "")
  story.replace("```", "")
  message.channel.send({ content: re.Discord.Util.cleanContent(story, message), split: { char: "." } })
}

module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: `See the current result of the one word story`,
  syntax: `${re.config.prefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias: ["onewordstory", "owsshow"],
  module: `${__dirname.split(`/`).pop()}`,
  access: { level: 0 },
}
