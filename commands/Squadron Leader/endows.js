const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  return;
};

module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: "End the one word story",
  syntax: `${re.func.getPrefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  alias: ["owsend"],
  module: `${__dirname.split(`/`).pop()}`,
  access: {level: 2}
}