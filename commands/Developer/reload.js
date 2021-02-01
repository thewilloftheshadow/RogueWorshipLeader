const re = require(`../../resources.js`).data
module.exports.run = async (client, message, args) => {
  let command = args[0];
  let commandfile = client.commands.get(command);
  if (!commandfile) return message.channel.send("Unable to find that command");
  let module = commandfile.help.module
  if(commandfile.help.alias){
    commandfile.help.alias.forEach(alias => {
      client.commands.delete(alias);
    });
  }
  client.commands.delete(command);
  
  delete require.cache[require.resolve(`/home/sd/rwl/commands/${module}/${commandfile.help.name}.js`)]

  let props = require(`../${module}/${commandfile.help.name}`);
  console.log(`Reload: Command "${command}" loaded`);
  client.commands.set(props.help.name, props);
  if (props.help.alias) {
    props.help.alias.forEach(alias => {
      client.commands.set(alias, props);
      console.log(` Alias ${alias} added`);
    });
  }

  message.channel.send("Command `"+command.toLowerCase()+"` successfully reloaded");
};

module.exports.help = {
  name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
  description: `Reload the specified command`,
  syntax: `${re.config.prefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()} <command>`,
  alias: [],
  module: `${__dirname.split(`/`).pop()}`,
  access: {eval: true}
}