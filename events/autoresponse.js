const { autoresponse } = require("../db")

module.exports = (client) => {
  client.on("messageCreate", (message) => {
    if (message.author?.bot) return
    if (!message.guild?.id) return
    let check = message.content.toLowerCase()
    let triggers = check.split(" ")

    triggers.forEach((x) => respond(x, message.channel))
  })
}

const respond = async (key, channel) => {
  if (process.env.DEBUG) console.log(`autoresponse: ${key}`)
  let responseDb = await autoresponse.findOne({ trigger: key, guild: channel.guild.id, deleted: false })

  let response = responseDb?.response

  if (!response) return

  let m = await channel.send({ content: `${response}` })
}

const sleep = async (time) => {
  await new Promise((r) => setTimeout(r, time))
}
