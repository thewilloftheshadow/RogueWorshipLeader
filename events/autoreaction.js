const { autoreaction } = require("../db")
const shuffle = require("shuffle-array")

module.exports = (client) => {
  client.on("messageCreate", async (message) => {
    if (message.author?.bot) return
    if (!message.guild?.id) return
    let check = message.content.toLowerCase()

    console.log(`[Autoreaction] Source phrase: ${check}`)

    let responses = await autoreaction.find({ guild: message.guild.id, deleted: false })
    responses.forEach((x) => {
      console.log(`[Autoreaction] Checking against: ${x.trigger.toLowerCase()}`)
      if (check.includes(x.trigger.toLowerCase())) {
        console.log(`[Autoreaction] Found match: ${x.trigger.toLowerCase()}`)
        const send = x.customEmojiId || x.unicodeEmoji
        if (!send) return console.log(`[Autoreaction] No emoji found.`)
        console.log(`[Autoreaction] Reacting: ${send}`)
        message.react(send).catch(() => {
          console.log(`[Autoreaction] Failed to react.`)
        })
      }
    })
  })
}
