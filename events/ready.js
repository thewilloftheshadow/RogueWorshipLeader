const re = require("../resources.js").data

re.client.on("ready", () => {
  console.log(`Bot has started, with ${re.client.users.cache.size} users, in ${re.client.channels.cache.size} channels of ${re.client.guilds.cache.size} guilds.`); 
  re.client.emit("botlog", `Bot has started, with ${re.client.users.cache.size} users, in ${re.client.channels.cache.size} channels of ${re.client.guilds.cache.size} guilds.`); 
  re.client.user.setActivity('Star Wars', { type: 'WATCHING' })
  let rebootchan = re.dbs.temp.get("rebootchan")
  if(rebootchan){
    re.client.channels.cache.get(rebootchan).send("Bot has successfully been rebooted!")
    re.dbs.temp.delete("rebootchan")
  }
});