// const { MessageEmbed } = require("discord.js")
// const shuffle = require("shuffle-array")
// const { Dropbox } = require("dropbox")

// module.exports = {
//   command: {
//     name: "doggo",
//     description: "Get a doggo picture!",
//     defaultPermission: true,
//   },
//   permissions: [],
//   run: async (interaction, client) => {
//     const dbx = new Dropbox({ accessToken: process.env.DROPBOX })
//     const dbxRequest = await dbx.filesListFolder({ path: "/R2-D2 Doggo Pictures" })
//     const files = dbxRequest.result.entries
//     let data = []
//     for await (const file of files) {
//       if (file.path_lower.endsWith("png")) data.push(await dbx.filesGetPreview({ path: file.path_lower }))
//     }
//     console.log(data)
//     // await interaction.deferReply()
//     // let embed = new MessageEmbed({
//     //   color: "RANDOM",
//     //   description: shuffle(responses)[0],
//     // })
//     // await interaction.editReply({ embeds: [embed], fetchReply: true })
//   },
// }
