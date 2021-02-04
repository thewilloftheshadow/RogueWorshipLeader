const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let channel = re.config.ows[0] // TODO: support multiple ows
  let story = re.vars.tscwd(re.dbs.ows.get(`${channel}.words`).join(" "))
  message.channel.send(re.Discord.Util.cleanContent(story, message), {
    split: { char: "." },
  })
}

module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: `See the current result of the one word story`,
  syntax: `${re.config.prefix}${__filename
    .split(`${__dirname}/`)
    .pop()
    .split(`.`)
    .shift()}`,
  alias: ["onewordstory", "owsshow"],
  module: `${__dirname.split(`/`).pop()}`,
  access: { level: 0 },
}
