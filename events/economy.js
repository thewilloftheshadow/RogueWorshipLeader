const { MessageButton, MessageActionRow } = require("discord.js")
const { ids } = require("../config")
const { sleep } = require("../config/fn")

const characters = {
  you: {
    username: "You",
  },
  ig37: {
    username: "IG-37",
    avatarURL: "https://i.imgur.com/UeMTl3R.png",
  },
  ava: {
    username: "Ava",
    avatarURL: "https://swrpggm.com/wp-content/uploads/2021/02/Corellian-Acklay-type-Light-Freighter_FE.png",
  },
  narrator: {
    username: "The Narrator",
    avatarURL:
      "https://images.unsplash.com/photo-1599806112354-67f8b5425a06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMGNsb3Vkc3xlbnwwfHwwfHw%3D&w=1000&q=80",
  },
}

const messages = [
  {
    msg: "You continue to call out for the stranger, but there's no response. You realize you'll have to take matters into your own hands if you want to get out of these woods. You start to run, following the faint glow of the moon through the trees.",
    character: characters.narrator,
  },
  {
    msg: "As you run, you hear the sound of footsteps behind you. You turn to see a figure emerging from the shadows, and your heart sinks. You think it might be the man with the knife, but as the figure comes closer, you see that it's not a man at all. It's a droid, with a slim build and harsh red eyes.",
    character: characters.narrator,
  },
  {
    msg: "She approaches you and speaks in a robotic voice.",
    character: characters.narrator,
  },
  {
    msg: "Greetings, human. My name is IG-37. I am a droid, here to assist you.",
    character: characters.ig37,
  },
  {
    msg: "You stare at the droid in shock, wondering if this is some kind of joke. But then you see the trader behind the droid, and you realize that this is real.",
    character: characters.narrator,
  },
  {
    msg: "Don't worry, you're safe here. I'm Ava, I'm a member of a group of space traders, traveling the galaxy in search of rare and valuable goods.",
    character: characters.ava,
  },
  {
    msg: "Thank goodness. I've been lost here for weeks, trying to get out of here.",
    character: characters.you,
  },
  {
    msg: "I can take you with us on my ship, the Striker, to the planet Atollon.",
    character: characters.ava,
  },
  {
    msg: "You're hesitant at first, but then you remember that you're lost in the woods and you have nowhere else to go. You decide to take a chance and accept Ava's offer.",
    character: characters.narrator,
  },
  {
    msg: "You follow her and IG-37 onto the Striker, and before you know it, you're soaring through space towards a new and exciting adventure on <#1023830938217623574>.",
    character: characters.narrator,
  },
]

module.exports = (client) => {
  client.on("messageCreate", async (message) => {
    if (message.author.bot) return
    if (message.channel.type === "DM") return
    if (message.guild.id !== ids.rwl) return

    switch (message.content) {
      case "!run":
        if (message.channel.id !== "1055924501407342613") return
        await message.delete()
        const thread = await message.channel.threads.create({
          name: `${message.author.username} runs`,
          type: "GUILD_PRIVATE_THREAD",
          reason: "Economy trigger",
        })
        await thread.members.add(message.author.id)

        const hooks = await message.channel.fetchWebhooks()
        let hook = hooks.find((h) => h.owner.id === client.user.id)
        if (!hook) hook = await message.channel.createWebhook("R2-D2", { avatar: client.user.displayAvatarURL() })

        await sleep(5000)
        for (const msg of messages) {
          await sleep(3000)
          await hook.send({
            content: msg.msg,
            username: msg.character.username,
            avatarURL: msg.character === characters.you ? message.member.displayAvatarURL() : msg.character.avatarURL,
            threadId: thread.id,
            components:
              msg === messages[messages.length - 1]
                ? [
                    new MessageActionRow().setComponents([
                      new MessageButton()
                        .setStyle("LINK")
                        .setLabel("Visit Atollon")
                        .setURL("https://discord.com/channels/791037986984820776/1023830938217623574"),
                    ]),
                  ]
                : [],
          })
        }

        await message.member.roles.remove("1027656119004434553")
        await message.member.roles.add("1023832382723346432")
    }
  })
}
