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

if (!re.dbs.master.get('starboards')) re.dbs.master.set('starboards', []);

const StarboardsManager = require('discord-starboards');
const StarboardsManagerCustomDb = class extends StarboardsManager {
    async getAllStarboards() {
        return re.dbs.master.get('starboards');
    }

    async saveStarboard(data) {
        re.dbs.master.push('starboards', data);
        return true;
    }
    async deleteStarboard(channelID, emoji) {
        const newStarboardsArray = re.dbs.master.get('starboards').filter((starboard) => !(starboard.channelID === channelID && starboard.options.emoji === emoji));
        re.dbs.master.set('starboards', newStarboardsArray);
        return true;
    }

    async editStarboard(channelID, emoji, data) {
        const starboards = re.dbs.master.get('starboards');
        const newStarboardsArray = starboards.filter((starboard) => !(starboard.channelID === channelID && starboard.options.emoji === emoji));
        newStarboardsArray.push(data);
        re.dbs.master.set('starboards', newStarboardsArray);
        return true;
    }
};

const manager = new StarboardsManagerCustomDb(re.client, {
    storage: false, // Important - use false instead of a storage path
});
re.client.starboardsManager = manager;

require("./handlers")(re.client);

