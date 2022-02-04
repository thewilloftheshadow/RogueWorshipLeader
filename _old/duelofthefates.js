const re = require(`./resources.js`).data

const maxHealth = 100
const minDamage = 0
const maxDamage = 0

const bar = "===================="

module.exports.run = async (client, message, args) => {
    let p1 = {user: message.member, health: 100}
    let p2 = {user: null, health: 100}
    p2.user = re.func.getuser(args.join(" "), message)
    if (!p2.user || p2.user == p1.user) p2.user = message.guild.me

    p1.boost = re.dbs.economy.get(`${message.guild.id}.${p1.user.id}.duelBoost`) ?? null
    p2.boost = re.dbs.economy.get(`${message.guild.id}.${p2.user.id}.duelBoost`) ?? null

    let embed = generateEmbed(p1, p2, "*Match starting in 3...*")
    let m = await message.channel.send({embeds: [embed]})
    
    await re.func.sleep(3000)

    embed = generateEmbed(p1, p2, "")
    await m.edit({embeds: [embed]}) 

    while(p1.health > 0 && p2.health > 0) {
        let battle = doBattle(p2, p1)
        embed = generateEmbed(p1, p2, `🛡 ${battle.message}`, embed)
        await m.edit({embeds: [embed]})
        await re.func.sleep(3000)
        if(p2.health <= 0) break;
        console.log("p2 health: ", p2.health)
        battle = doBattle(p1, p2)
        embed = generateEmbed(p1, p2, `⚔ ${battle.message}`, embed)
        await m.edit({embeds: [embed]})
        await re.func.sleep(3000)
    }
    let winner, loser
    if(p1.health > 0) {
        winner = p1
        loser = p2
    } else {
        winner = p2
        loser = p1
    }
    embed = generateEmbed(p1, p2, `\n🏆 **${winner.user.nickname}** has won the duel!`, embed)
    m.edit({embeds: [embed]})

    
}

module.exports.help = {
    name: `${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
    description: "Duel another player!",
    syntax: `${re.config.prefix}${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`,
    alias: ["duel"],
    module: `${__dirname.split(`/`).pop()}`,
    access: { level: 0 },
}

const generateEmbed = (p1, p2, content = "Error: No message defined", oldembed = null) => {
    let embed = new re.Discord.MessageEmbed().setTitle("<:Rebellion:799751856154607666> Duel of the Fates").setDescription(`${oldembed?.description ? `${oldembed.description}\n` : ""}${content}\n${bar}`).setColor(14232643)
    embed.addField(p1.user.nickname, `${p1.health}/${maxHealth} HP`, true)
    embed.addField(p2.user.nickname, `${p2.health}/${maxHealth} HP`, true)
    return embed
}

const doBattle = (attacker, attacked) => {
    let x = re.func.getRandom(0, 100)
    let data = {}
    if(x <= 5) {
        data.baseDamage = re.func.getRandom(40, 50)
    } else if(x <= 15) {
        data.baseDamage = re.func.getRandom(30, 40)
    } else if(x <= 45) {
        data.baseDamage = re.func.getRandom(20, 30)
    } else {
        data.baseDamage = re.func.getRandom(1, 20)
    }
    data.bonusDamage = attacker.boost ? re.func.getRandom(attacker.boost.min, attacker.boost.max) : 0
    data.totalDamage = data.baseDamage + data.bonusDamage
    attacked.health = attacked.health - data.totalDamage
    if(attacked.health < 0) attacked.health = 0
    console.log(data, attacked.health, attacker.health)
    data.message = `**${attacker.user.nickname}** attacked **${attacked.user.nickname}**, dealing ${data.baseDamage} damage${attacker.boost ? `, and ${data.bonusDamage} bonus damage from their **${re.vars.tscwd(attacker.boost.id).replace(".", "")}**` : ""}!`
    return data
}
