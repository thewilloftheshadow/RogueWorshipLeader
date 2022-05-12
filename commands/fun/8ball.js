const responses = [
  "It is certain.",
  "It is decidedly so.",
  "Without a doubt.",
  "Yes definitely.",
  "You may rely on it.",
  "As I see it, yes.",
  "Most likely.",
  "Outlook good.",
  "Yes.",
  "Signs point to yes.",
  "Reply hazy try again.",
  "Ask again later.",
  "Better not tell you now.",
  "Cannot predict now.",
  "Concentrate and ask again.",
  "Don't count on it.",
  "My reply is no.",
  "My sources say no.",
  "Outlook not so good.",
  "Very doubtful.",
  "No way.",
  "Maybe",
  "The answer is hiding inside you",
  "No.",
  "Depends on the mood of the CS god",
  "||No||",
  "||Yes||",
  "Hang on",
  "It's over",
  "It's just the beginning",
  "Good Luck",
]

const { MessageEmbed } = require("discord.js")
const shuffle = require("shuffle-array")

module.exports = {
  command: {
    name: "8ball",
    description: "Give the 8-ball a magic shake",
    defaultPermission: true,
  },
  permissions: [],
  run: async (interaction, client) => {
    await interaction.deferReply()
    let embed = new MessageEmbed({
      color: "RANDOM",
      description: shuffle(responses)[0],
    })
    await interaction.editReply({ embeds: [embed], fetchReply: true })
  },
}
