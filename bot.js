const re = require(`./resources.js`).data
require('dotenv').config()
console.log('\nStarting bot...')
if(re.config.debug.client) re.client.on('debug', m => console.debug(m));
re.client.on('warn', m => console.log(m));
re.client.on('error', m => console.error(m));
//re.client.on('botlog', m => re.config.logs.send(m))
process.on('uncaughtException', error => console.error(error));
re.client.commands = new re.vars.Discord.Collection()
re.client.login(process.env.TOKEN);
require("./handlers")(re.client);
