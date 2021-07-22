const re = require(`../resources.js`).data
const maxHealth = 100
const bar = "===================="

re.client.on("interactionCreate", async (interaction) => {
    if (!interaction.isButton()) return
    console.log(interaction)
    let [lockTo, command, argString] = interaction.customId.split("=")
    if (interaction.user.id != lockTo) return interaction.deferUpdate()
    let args = argString?.split(";")

    if (command == "duel:decline") {
        interaction.update({
            content: `~~${interaction.message.content}~~\n\nThe duel was declined!`,
            components: [],
        })
    }

    if (command == "duel:accept") {
        let p1 = { user: interaction.guild.members.cache.get(args[0]), health: maxHealth }
        let p2 = { user: interaction.guild.members.cache.get(args[1]), health: maxHealth }
        let amount = args[2] || 0

        p1.boost = re.dbs.economy.get(`${interaction.guild.id}.${p1.user.id}.duelBoost`) ?? null
        p2.boost = re.dbs.economy.get(`${interaction.guild.id}.${p2.user.id}.duelBoost`) ?? null

        let embed = generateEmbed(p1, p2, "*Match starting in 3...*")
        await interaction.update({ content: null, embeds: [embed], components: []})

        await re.func.sleep(3000)

        embed = generateEmbed(p1, p2, "")
        await interaction.editReply({ embeds: [embed] })

        while (p1.health > 0 && p2.health > 0) {
            let battle = doBattle(p2, p1)
            embed = generateEmbed(p1, p2, `🛡 ${battle.message}`, embed)
            await interaction.editReply({ embeds: [embed] })
            await re.func.sleep(3000)
            if (p2.health <= 0) break
            battle = doBattle(p1, p2)
            embed = generateEmbed(p1, p2, `⚔ ${battle.message}`, embed)
            await interaction.editReply({ embeds: [embed] })
            await re.func.sleep(3000)
        }
        let winner, loser
        if (p1.health > 0) {
            winner = p1
            loser = p2
        } else {
            winner = p2
            loser = p1
        }
        embed = generateEmbed(p1, p2, `\n🏆 **${winner.user.displayName}** has won the duel${amount ? ` and the ${amount} credits!` : ""}!`, embed)
        if(amount) {
            re.unb.editUserBalance(interaction.guild.id, winner.user.id, {cash: amount})
            re.unb.editUserBalance(interaction.guild.id, loser.user.id, {cash: 0 - amount})
        }
        interaction.editReply({ embeds: [embed] })
        checkDurability(p1.user.id, interaction.guild.id)
        checkDurability(p2.user.id, interaction.guild.id)
    }
})

const generateEmbed = (p1, p2, content = "Error: No message defined", oldembed = null) => {
    let embed = new re.Discord.MessageEmbed()
        .setTitle("<:Rebellion:799751856154607666> Duel of the Fates")
        .setDescription(`${oldembed?.description ? `${oldembed.description}\n` : ""}${content}\n${bar}`)
        .setColor(14232643)
    embed.addField(p1.user.displayName, `${p1.health}/${maxHealth} HP`, true)
    embed.addField(p2.user.displayName, `${p2.health}/${maxHealth} HP`, true)
    return embed
}

const doBattle = (attacker, attacked) => {
    let x = re.func.getRandom(0, 100)
    let data = {}
    if (x <= 5) {
        data.baseDamage = re.func.getRandom(40, 50)
    } else if (x <= 15) {
        data.baseDamage = re.func.getRandom(30, 40)
    } else if (x <= 45) {
        data.baseDamage = re.func.getRandom(20, 30)
    } else {
        data.baseDamage = re.func.getRandom(1, 20)
    }
    data.bonusDamage = attacker.boost ? re.func.getRandom(attacker.boost.min, attacker.boost.max) : 0
    data.totalDamage = data.baseDamage + data.bonusDamage
    attacked.health = attacked.health - data.totalDamage
    if (attacked.health < 0) attacked.health = 0
    data.message = `**${attacker.user.displayName}** attacked **${attacked.user.displayName}**, dealing ${data.baseDamage} damage${attacker.boost ? `, and ${data.bonusDamage} bonus damage from their **${re.vars.tscwd(attacker.boost.id).replace(".", "")}**` : ""}!`
    return data
}

const checkDurability = (userid, guildid) => {
    let item = re.dbs.economy.get(`${guildid}.${userid}.duelBoost`)
    if(!item) return
    item.durability = item.durability - 1
    if(item.durability <= 0) {
        re.dbs.economy.delete(`${guildid}.${userid}.duelBoost`)
        re.client.users.cache.get(userid).send(`Your ${item.id} has broken!`)
    } else {
        re.dbs.economy.set(`${guildid}.${userid}.duelBoost`, item)
    }
}
