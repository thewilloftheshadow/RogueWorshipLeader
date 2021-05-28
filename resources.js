const config = require(`./config.js`)
const Discord = require(`discord.js`)
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "USER"], fetchAllMembers: true })
const func = {
  sleep: function (ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  },
  prettyNumber: function (number) {
    if (!typeof number === "string") number = number.toString()
    number.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  },
  capitalizeFirstLetter: function (string) {
    if (typeof string == undefined) return
    var firstLetter = string[0] || string.charAt(0)
    return firstLetter ? string.replace(/^./, firstLetter.toUpperCase()) : ""
  },
  clean: function (text) {
    if (typeof text === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203))
    else return text
  },
  formatClean: function (text) {
    if (typeof text === "string") return text.replace(/`/g, "").replace(/@/g, "@" + String.fromCharCode(8203))
    else return text
  },
  getRandom: function (min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
  },
  capFirstLetter: function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  },
  getMemoryUsage: function () {
    let total_rss = require("fs")
      .readFileSync("/sys/fs/cgroup/memory/memory.stat", "utf8")
      .split("\n")
      .filter((l) => l.startsWith("total_rss"))[0]
      .split(" ")[1]
    return (process.memoryUsage().heapUsed / (1024 * 1024)).toFixed(2)
  },
  botperms: function (userid, message) {
    if (userid instanceof Discord.GuildMember) userid = userid.id
    if (userid instanceof Discord.User) userid = userid.id
    let perms = {
      level: 1,
      eval: false,
      bot: false,
      bypass: false,
    }
    let permmem = message.guild ? message.guild.members.cache.get(userid) : message.client.users.cache.get(userid)

    if (message.guild) {
      if (permmem.roles.cache.has(config.roles.lieutenant)) perms.level = 2
      if (permmem.roles.cache.has(config.roles.squadleader)) perms.level = 3
      if (permmem.roles.cache.has(config.roles.admin)) perms.level = 4
      if (permmem.id == message.guild.ownerID) perms.bypass = true
    }
    if (userid === config.ownerID) perms.eval = true
    if (userid === config.ownerID) perms.bypass = true
    if (permmem.user?.bot)
      perms = {
        level: 0,
        eval: false,
        bot: true,
        bypass: false
      }
    return perms
  },
  getuser: function (input, message) {
    if (!input) return message.member
    let target = message.mentions.members.first()
    if (target == null) {
      target = message.guild.members.fetch(input)
    }
    if (target == null) {
      target = message.guild.members.cache.find((member) => member.user.tag === input || member.user.id === input || member.user.username === input || (member.nickname !== null && member.nickname === input))
    }
    if (target == null) {
      target = message.guild.members.cache.find((member) => member.user.username.toLowerCase() + "#" + member.user.discriminator === input.toLowerCase() || member.user.username.toLowerCase() === input.toLowerCase() || (member.nickname !== null && member.nickname.toLowerCase() === input.toLowerCase()))
    }
    if (target == null) {
      target = message.guild.members.cache.find((member) => member.user.username.startsWith(input) || member.user.username.toLowerCase().startsWith(input.toLowerCase()))
    }
    if (target == null) {
      target = message.guild.members.cache.find((member) => (member.nickname !== null && member.nickname.startsWith(input)) || (member.nickname !== null && member.nickname.toLowerCase().startsWith(input.toLowerCase())))
    }
    if (target == null) {
      target = message.guild.members.cache.find((member) => member.user.username.toLowerCase().includes(input.toLowerCase()) || (member.nickname !== null && member.nickname.toLowerCase().includes(input.toLowerCase())))
    }
    return target
  },
  paginator: async (author, msg, embeds, pageNow, addReactions = true) => {
    if (embeds.length === 1) return
    if (addReactions) {
      await msg.react("⏪")
      await msg.react("◀")
      await msg.react("▶")
      await msg.react("⏩")
    }
    let reaction = await msg.awaitReactions((reaction, user) => user.id == author && ["◀", "▶", "⏪", "⏩"].includes(reaction.emoji.name), { time: 30 * 1000, max: 1, errors: ["time"] }).catch(() => {})
    if (!reaction) return msg.reactions.removeAll().catch(() => {})
    reaction = reaction.first()
    //console.log(msg.member.users.tag)
    if (msg.channel.type == "dm" || !msg.guild.me.hasPermission("MANAGE_MESSAGES")) {
      if (reaction.emoji.name == "◀") {
        let m = await msg.channel.send(embeds[Math.max(pageNow - 1, 0)])
        msg.delete()
        func.paginator(author, m, embeds, Math.max(pageNow - 1, 0))
      } else if (reaction.emoji.name == "▶") {
        let m = await msg.channel.send(embeds[Math.min(pageNow + 1, embeds.length - 1)])
        msg.delete()
        func.paginator(author, m, embeds, Math.min(pageNow + 1, embeds.length - 1))
      } else if (reaction.emoji.name == "⏪") {
        let m = await msg.channel.send(embeds[0])
        msg.delete()
        func.paginator(author, m, embeds, 0)
      } else if (reaction.emoji.name == "⏩") {
        let m = await msg.channel.send(embeds[embeds.length - 1])
        msg.delete()
        func.paginator(author, m, embeds, embeds.length - 1)
      }
    } else {
      if (reaction.emoji.name == "◀") {
        await reaction.users.remove(author)
        let m = await msg.edit(embeds[Math.max(pageNow - 1, 0)])
        func.paginator(author, m, embeds, Math.max(pageNow - 1, 0), false)
      } else if (reaction.emoji.name == "▶") {
        await reaction.users.remove(author)
        let m = await msg.edit(embeds[Math.min(pageNow + 1, embeds.length - 1)])
        func.paginator(author, m, embeds, Math.min(pageNow + 1, embeds.length - 1), false)
      } else if (reaction.emoji.name == "⏪") {
        await reaction.users.remove(author)
        let m = await msg.edit(embeds[0])
        func.paginator(author, m, embeds, 0, false)
      } else if (reaction.emoji.name == "⏩") {
        await reaction.users.remove(author)
        let m = await msg.edit(embeds[embeds.length - 1])
        func.paginator(author, m, embeds, embeds.length - 1, false)
      }
    }
  },
  randomString: function (len) {
    let buf = [],
      chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
      charlen = chars.length

    for (var i = 0; i < len; ++i) {
      buf.push(chars[func.getRandom(0, charlen - 1)])
    }

    return buf.join("")
  },
  getEmoji: function (name) {
    return client.emojis.cache.find((emoji) => emoji.name.toLowerCase() == name.toLowerCase().replace(/ /g, "_"))
  },
  level: function (xp) {
    let levelXP = 5 / 6 * xp * (2 * xp * xp + 27 * xp + 91);
    let remainingXP = levelXP - xp;
    return {levelXP, remainingXP/*, currentLevel, nextLevel: currentLevel + 1*/}
  }
}
const vars = {
  Discord: require(`discord.js`),
  config: require(`./config.js`),
  db: require(`quick.db`),
  cmd: require(`node-cmd`),
  fs: require(`fs`),
  ms: require(`ms`),
  pull: require("array-pull"),
  randomColor: require("random-color"),
  tscwd: require("to-sentence-case-with-dot").default,
  botperms: {
    0: "Unknown User / Bot",
    1: "Squadron Member",
    2: "Lieutenant",
    3: "Squadron Leader",
    4: "Commander",
  },
  permlist: {
    "0x00000001": "CREATE_INSTANT_INVITE",
    "0x00000002": "KICK_MEMBERS",
    "0x00000004": "BAN_MEMBERS",
    "0x00000008": "ADMINISTRATOR",
    "0x00000010": "MANAGE_CHANNELS",
    "0x00000020": "MANAGE_GUILD",
    "0x00000040": "ADD_REACTIONS",
    "0x00000080": "VIEW_AUDIT_LOG",
    "0x00000400": "VIEW_CHANNEL",
    "0x00000800": "SEND_MESSAGES",
    "0x00001000": "SEND_TTS_MESSAGES",
    "0x00002000": "MANAGE_MESSAGES",
    "0x00004000": "EMBED_LINKS",
    "0x00008000": "ATTACH_FILES",
    "0x00010000": "READ_MESSAGE_HISTORY",
    "0x00020000": "MENTION_EVERYONE",
    "0x00040000": "USE_EXTERNAL_EMOJIS",
    "0x00100000": "CONNECT",
    "0x00200000": "SPEAK",
    "0x00400000": "MUTE_MEMBERS",
    "0x00800000": "DEAFEN_MEMBERS",
    "0x01000000": "MOVE_MEMBERS",
    "0x02000000": "USE_VAD",
    "0x00000100": "PRIORITY_SPEAKER",
    "0x00000200": "STREAM",
    "0x04000000": "CHANGE_NICKNAME",
    "0x08000000": "MANAGE_NICKNAMES",
    "0x10000000": "MANAGE_ROLES",
    "0x20000000": "MANAGE_WEBHOOKS",
    "0x40000000": "MANAGE_EMOJIS",
  },
}
//Database tables
const dbs = {
  resp: new vars.db.table("resp"),
  ows: new vars.db.table("ows"),
  temp: new vars.db.table("temp"),
  levels: new vars.db.table("levels"),
  master: new vars.db.table("master"),
  facts: new vars.db.table("facts"),
}

dbs.list = Object.getOwnPropertyNames(dbs)
vars.list = Object.getOwnPropertyNames(vars)
func.list = Object.getOwnPropertyNames(func)

exports.data = {
  func: func,
  vars: vars,
  moment: require("moment"),
  prefix: config.prefix,
  dbs: dbs,
  client: client,
  Discord: Discord,
  config: vars.config,
}

exports.data.list = Object.getOwnPropertyNames(exports.data)
