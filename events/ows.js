// one word story handler
const re = require(`../resources.js`).data
re.client.on("message", (message) => {
  return; //disable ows
    if(!config.ows.includes(message.channel.id)) return //ignore non-one word story channel
    let data = re.dbs.ows.get(message.channel.id)
    if(data.ended) return; //ignore ended ows
  
    if(data.lastUser == message.author.id) return message.delete() // if the last user and new user are the same, delete message
    
    let words = message.content.split(/ /g) // split message content by spaces
    if(words.length > 1) return message.delete() // if there is more than one word, delete message
  
    db.set(`${message.channel.id}.lastUser`, message.author.id) // save ID of user who successfully sent a message
    db.push(`${message.channel.id}.words`, message.content)
  })