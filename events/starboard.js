const re = require("../resources.js").data

re.client.starboardsManager.on('starboardCreate', (data) => {
    const channel = re.client.channels.cache.get(data.channelID);
    channel.send(`This channel has been setup as a starboard!
If you want to get your message here, 3 other people have to react to it with ${starboard.options.emoji}
This is an alternative to pinned messages because pin limit bad `);
});

re.client.starboardsManager.on('starboardReactionNsfw', (emoji, message, user) => {
    message.author.send(`You cannot add messages from an NSFW channel to the starboard.`)
});

re.client.starboardsManager.on('starboardNoSelfStar', (emoji, message, user) => {
    message.channel.send(`You cannot ${emoji} your own messages.`)
});

re.client.starboardsManager.on('starboardNoEmptyMsg', (emoji, message, user) => {
    message.channel.send(`You cannot ${emoji} an empty message.`)
});