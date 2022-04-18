console.log("Booting bot...")
require("dotenv").config()
const fs = require("fs")
const Discord = require("discord.js")
const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES"],
})
const { ids } = require("./config")
const db = require("./db.js")
const shuffle = require("shuffle-array")
const config = require("./config")

client.commands = new Discord.Collection()
fs.readdir("./commands/", (err, files) => {
  files.forEach((file) => {
    let path = `./commands/${file}`
    fs.readdir(path, (err, files) => {
      if (err) console.error(err)
      let jsfile = files.filter((f) => f.endsWith(".js"))
      if (jsfile.length <= 0) {
        console.error(`Couldn't find slash commands in the ${file} category.`)
      }
      jsfile.forEach((f, i) => {
        let props = require(`./commands/${file}/${f}`)
        props.category = file
        try {
          client.commands.set(props.command.name, props)
        } catch (err) {
          if (err) console.error(err)
        }
      })
    })
  })
})

client.buttons = new Discord.Collection()
fs.readdir("./buttons/", (err, files) => {
  let jsfile = files.filter((f) => f.endsWith(".js"))
  jsfile.forEach((f, i) => {
    let run = require(`./buttons/${f}`)
    try {
      client.buttons.set(f.replace(".js", ""), run)
    } catch (err) {
      if (err) console.error(err)
    }
  })
})

client.modals = new Discord.Collection()
fs.readdir("./modals/", (err, files) => {
  let jsfile = files.filter((f) => f.endsWith(".js"))
  jsfile.forEach((f, i) => {
    let run = require(`./modals/${f}`)
    try {
      client.modals.set(f.replace(".js", ""), run)
    } catch (err) {
      if (err) console.error(err)
    }
  })
})

const eventFiles = fs.readdirSync("./events").filter((file) => file.endsWith(".js"))
for (const file of eventFiles) {
  require(`./events/${file}`)(client)
}

//Bot on startup
client.on("ready", async () => {
  console.log(`Connected to Discord! Logged in as ${client.user.tag}`)
})

if (process.env.DEBUG) client.on("debug", console.debug)


client.login(process.env.TOKEN)
module.exports = { client }
