const re = require("./resources.js").data;
const fs = re.vars.fs
module.exports = client => {
  fs.readdir("./events/", (err, files) => {
        if (err) console.error(err);
        let jsfiles = files.filter(f => f.split(".").pop() === "js");
        if (jsfiles.length <= 0) return console.error("There are no events to load...");
        if(re.config.debug.handlers) console.debug(`Loading ${jsfiles.length} events...`);
        jsfiles.forEach((f, i) => {
            require(`./events/${f}`);
            if(re.config.debug.handlers) console.debug(`${i + 1}: Event "${f.split(".js").join("")}" loaded`);
        });
    });
   fs.readdir("./commands/", (err, files) => {
    files.forEach(file => {
        let path = `./commands/${file}`
        fs.readdir(path, (err, files) => {
          if(err) console.error(err)
          let jsfile = files.filter(f => f.split(".").pop() === "js");
          if(jsfile.length <= 0){
            console.error(`Couldn't find commands in the ${file} category.`);
            return;
          }
          if(re.config.debug.handlers) console.debug(`\nLoading ${jsfile.length} commands in the ${file} category...`);
          jsfile.forEach((f, i) =>{
            let props = require(`./commands/${file}/${f}`);
            if(re.config.debug.handlers) console.debug(`${i + 1}: Command "${f.split(".js").join("")}" loaded`)
            try{
              client.commands.set(props.help.name, props)
              if(props.help.alias){
  
                  props.help.alias.forEach(alias => {
                    client.commands.set(alias, props);
                    if(re.config.debug.handlers) console.debug(` Alias ${alias} added`);
                  });
              }
            }
            catch(err){
              if(err) console.error(err)
            }
          });
        })
    })
  });
}