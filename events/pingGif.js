const { users } = require("../db")

module.exports = (client) => {
  client.on("messageCreate", (message) => {
    message.mentions.members
      .filter((x) => x.id != message.mentions.repliedUser?.id || (x.id == message.mentions.repliedUser?.id && message.content.includes(x.id)))
      .forEach((x) => pingGif(x.id, message.channel))
  })
}

const pingGif = async (userId, channel) => {
  if (process.env.DEBUG) console.log(`pingGif: ${userId}`)
  let userDb = await users.findOne({ user: userId })

  let gif = userDb?.pingGif

  console.log(userDb)

  if (!gif) return

  if (process.env.DEBUG) console.log(`pingGif: no gif set`)

  let m = await channel.send({ content: `${gif}` })

  if (process.env.DEBUG) console.log(`pingGif: sent`)

  await sleep(25000)

  m.delete().catch(() => {})

  if (process.env.DEBUG) console.log(`pingGif: deleted`)
}

const sleep = async (time) => {
  await new Promise((r) => setTimeout(r, time))
}
