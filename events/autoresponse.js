const re = require(`../resources.js`).data

re.client.on("message", (message) => {
    if(!message.content) return;
  let ar = re.dbs.resp.get(message.content)
  if(ar) message.channel.send(ar.response)
});

// This will allow edited messages to be triggered as commands also