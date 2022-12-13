module.exports = {
  command: {
    name: "mock",
    description: "Mock someone",
    options: [
      {
        type: "STRING",
        name: "message",
        description: "The message to mock",
        required: true,
      },
    ],
  },
  permissions: [],
  run: async (interaction, client) => {
    await interaction.deferReply()
    let message = interaction.options.get("message").value.toLowerCase()
    // make every other letter in message uppercase
    let mock = message.split("").map((char, i) => {
      if (i % 2 == 0) return char.toUpperCase()
      else return char
    })
    await interaction.editReply(mock.join(""))
  },
}
