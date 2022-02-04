const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  const m = await message.channel.send("Ping?");
  let embed = {
    title:`:ping_pong: **Pong!**`,
    author:{
      name:client.user.tag,
      icon_url:client.user.avatarURL()
    },
    color: re.config.color,
    fields:[
      {
        name:`**Latency:** \u200b \u200b \u200b \u200b \u200b \u200b \u200b`,
        value:`\`${m.createdTimestamp - message.createdTimestamp}ms\``,
        inline:true
      },
      {
        name:`**Api Latency:**`,
        value:`\`${Math.round(client.ws.ping)}ms\``,
        inline:true
      }
    ]
  }
  m.edit({content: null, embeds: [embed]})
};

module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: `Tests the ping of the bot`,
  syntax: `${re.config.prefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias: ["pong", "test"],
  module: `${__dirname.split(`/`).pop()}`,
  access: {level: 0}
}