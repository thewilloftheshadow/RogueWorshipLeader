const { autoresponse } = require("../db")

module.exports = (client) => {
  client.on("messageCreate", (message) => {
    let triggers = message.content.split(" ")

    triggers.forEach((x) => respond(x, message.channel))
  })
}

const respond = async (key, channel) => {
  if (process.env.DEBUG) console.log(`autoresponse: ${key}`)
  let responseDb = await autoresponse.findOne({ trigger: key })

  let response = responseDb?.response

  if (!response) return

  let m = await channel.send({ content: `${response}` })

  await sleep(15000)

  m.delete().catch(() => {})
}

const sleep = async (time) => {
  await new Promise((r) => setTimeout(r, time))
}
