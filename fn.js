const { permissions } = require("./config/modmaster")

module.exports = {}


module.exports.formatConfig = (userDb) => {
    let dataString = "```ini\n"

    dataString += `[Ping GIF]\n${userDb.pingGif ?? "No GIF set"}\n\n`

    console.log(userDb.perms)

    let pData = {...userDb.perms}

    let p = ""
    
    for(let perm in pData) {
        p += `${pData[perm] ? y : n} ${permissions.find(a => a.value == perm).name}\n`
    }

    dataString += `[Permissions]\n${p}\n\n`

    dataString += "```"

    return dataString
}

const y = `✅`
const n = `❌`