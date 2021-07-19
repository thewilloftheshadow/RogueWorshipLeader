const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  const data = [
    {
      name: "newcode",
      description: "Generate a code for /redeem!",
      defaultPermission: false,
      options: [
        {
          name: "amount",
          type: "INTEGER",
          description: "The amount of credits this code should be worth",
          required: true,
        },
        {
          name: "time",
          type: "INTEGER",
          description: "Minutes until this code can no longer be redeemed",
          required: false,
        },
        {
          name: "limit",
          type: "INTEGER",
          description: "Limit on how many times this code can be redeemed",
          required: false,
        },
        {
          name: "dmuser",
          type: "USER",
          description: "A user the code should be DMed to",
          required: false,
        },
        {
          name: "dmmessage",
          type: "STRING",
          description: "If the code is DMed, what the message should say",
          required: false,
        },
      ],
    },
    {
      name: "redeem",
      description: "Redeem your code!",
      options: [
        {
          name: "code",
          type: "STRING",
          description: "Your code",
          required: true,
        },
      ],
    },
    // {
    //   name: "duelofthefates",
    //   description: "Duel another user in the server!",
    //   options: [
    //     {
    //       name: "user",
    //       type: "USER",
    //       description: "Who you want to duel",
    //       required: true,
    //     },
    //   ],
    // },
  ]
  console.log(data)
  data.forEach((x) => message.guild.commands.create(x))
  message.react("✅")
}

module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: "Deploy the slash commands",
  syntax: `${re.config.prefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias: [],
  module: `${__dirname.split(`/`).pop()}`,
  access: { eval: true },
}
