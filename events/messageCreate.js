const config = require("../config")
const db = require("../db")
const fs = require("fs")
const ms = require("ms")
const shuffle = require("shuffle-array")
const { Util } = require("discord.js")
const { ids } = require("../config")

const prefix = "^"

module.exports = (client) => {
  client.on("messageCreate", async (message) => {
    if (!message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).split(/ +/)
    console.log(args)
    let cmd = args.shift()
    if (cmd == "") cmd = args.shift()

    console.log(message.content)
    console.log(`command: `, cmd)
    console.log(args)

    if (message.member.roles.cache.has(ids.admin) || message.author.id == "439223656200273932") {
      if (cmd == "botstats") {
        let msg = {}
        msg.guilds = client.guilds.cache.size
        msg.users = client.guilds.cache.filter((guild) => guild.available).reduce((prev, curr) => prev + curr.memberCount, 0)
        message.channel.send(JSON.stringify(msg))
      }
    }

    if (ids.commanders.includes(message.author.id)) {
      if (cmd == "togglecommander") {
        if (message.member.roles.cache.has(ids.roles.commander)) {
          message.member.roles.remove(ids.roles.commander)
          message.channel.send("<:Salute:962178085782958120>")
        } else {
          message.member.roles.add(ids.roles.commander)
          message.channel.send("<:Salute:962178085782958120>")
        }
      }
    }

    if (ids.devs.includes(message.author.id)) {
      if (cmd == "updateslash") {
        const type = args[0] ?? "default"
        console.log("Updating slash commands...")

        try {
          let done = 0
          if (type == "admin") {
            client.commands
              .filter((x) => x.command.adminGuild)
              .each((cmd) => {
                client.application.commands.create(cmd.command, message.guild.id)
                done += 1
                console.log(`Loaded admin command`, cmd.command.name)
              })
          } else {
            client.commands
              .filter((x) => !x.command.adminGuild)
              .each((cmd) => {
                //client.application.commands.create(cmd.command, message.guild.id)
                cmd.permissions = []
                client.application.commands.create(cmd.command, message.guild.id).then((command) => {
                  console.log(`Loaded command`, cmd.command.name)
                })
                done += 1
              })
          }
          message.reply({ content: `${done} slash commands queued to be deployed in ${type}. Check console for live updates` })
        } catch (err) {
          console.error(err)
        }
      }

      if (cmd == "eval") {
        try {
          if (!args[0]) return message.channel.send("undefined", { code: "js" })

          let codeArr = args.slice(0).join(" ").split("\n")
          if (!codeArr[codeArr.length - 1].startsWith("return")) codeArr[codeArr.length - 1] = `return ${codeArr[codeArr.length - 1]}`

          const code = `async () => { ${codeArr.join("\n")} }`

          let out = await eval(code)()

          message.channel.send(`Typeof output: **${typeof out}**`)
          if (typeof out !== "string") out = require("util").inspect(out)
          out = out.replace(process.env.TOKEN, "[TOKEN REDACTED]").replace(process.env.MONGODB, "[DB URI REDACTED]")

          message.channel.send({ content: out ? out : "null", split: true, code: "js" })
        } catch (err) {
          message.channel.send("An error occurred when trying to execute this command.")
          console.log(err)
          return message.channel.send(`${err}`, { code: "js" })
        }
      }
    }
  })
}
