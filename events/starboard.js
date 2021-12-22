const re = require("../resources.js").data

re.client.starboardsManager.on("starboardCreate", (data) => {
  const channel = re.client.channels.cache.get(data.channelID)
  channel.send(`If you want to get your message here, ${data.options.threshold} other people have to react to it with ${re.client.emojis.cache.get(data.options.emoji)}!`).then((m) => m.pin())
})

re.client.starboardsManager.on("starboardReactionNsfw", (emoji, message, user) => {
  message.author.send(`You cannot add messages from an NSFW channel to the starboard.`)
})

re.client.starboardsManager.on("starboardNoSelfStar", (emoji, message, user) => {
  message.author.send(`You cannot ${re.client.emojis.cache.get(emoji)} your own messages.`)
})

re.client.starboardsManager.on("starboardNoEmptyMsg", (emoji, message, user) => {
  message.channel.send(`You cannot ${re.client.emojis.cache.get(emoji)} an empty message.`)
})

re.client.starboardsManager.on("starboardReactionAdd", (emoji, message, user) => {
  console.log(`${user.username} reacted to a message with ${emoji} (message id: ${message.id}).`);
});
