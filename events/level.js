const re = require(`../resources.js`).data
re.client.on("message", async (message) => {
  if (!message.guild || message.author.bot) return
  let data = re.dbs.levels.get(`${message.guild.id}.${message.author.id}`)
  if(!data) {
    re.dbs.levels.set(`${message.guild.id}.${message.author.id}`, {xp: 0, level: 1})
    data = {xp: 0, level: 1}
  }
  let check = re.client.xpcd.get(`${message.guild.id}-${message.author.id}`)
  if(check + 60000 > Date.now()) return
  let xpadd = re.func.getRandom(15, 26)
  data.xp += xpadd
  let calc = re.func.xp(data.level, data.xp)
  console.log(message.author.id, calc, data)
  if(calc.remainingXP <= 0) {
    data.level += 1
    data.xp = Math.abs(calc.remainingXP)
    let msg = `<@${message.author.id}>, congrats on leveling up to Level ${data.level}!`
    let lu = message.guild.channels.cache.find(x => ["level-up", "leveling", "level"].includes(x.name))
    lu ? lu.send(msg).catch(() => message.channel.send(msg)) : message.channel.send(msg)
  }
  re.dbs.levels.set(`${message.guild.id}.${message.author.id}`, data)
  re.client.xpcd.set(`${message.guild.id}-${message.author.id}`, Date.now())
})
