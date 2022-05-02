const { autoresponse } = require("../db")

module.exports = (client) => {
  client.on("messageCreate", (message) => {
    if (message.author?.bot) return
    if (!message.guild?.id) return
    let check = message.content.toLowerCase()
    
    let responses = await autoresponse.find({guild: message.guild.id, deleted: false})
    responses.forEach(x => {
      if(check.includes(x.trigger)) {
        await channel.send({ content: `${response}` })
      }
    })

    triggers.forEach((x) => respond(x, message.channel))
  })
}
