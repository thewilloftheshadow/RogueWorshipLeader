const re = require(`../resources.js`).data
const maxHealth = 100
const bar = "===================="

re.client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return
    console.log(interaction)

    if (interaction.commandName === "redeem") {
        let code = interaction.options.get("code").value
        let data = re.dbs.codes.get(code)
        if (!data) return interaction.reply({ content: "That code is either expired or invalid!", ephemeral: true })
        if (data.expiresAt && Date.now() > data.expiresAt) {
            data.expired = true
            re.dbs.codes.set(code, data)
        }
        if (data.limit && data.used.length >= data.limit) {
            data.expired = true
            re.dbs.codes.set(code, data)
        }
        if (data.used.includes(interaction.user.id)) return interaction.reply({ content: "You have already redeemed that code!", ephemeral: true })
        if (data.expired) return interaction.reply({ content: "That code is either expired or invalid!", ephemeral: true })
        re.unb.editUserBalance(interaction.guild.id, interaction.user.id, { cash: data.amount, reason: `Claimed code ||${code}||` })
        re.dbs.codes.push(`${code}.used`, interaction.user.id)
        re.client.channels.cache.get(re.config.errors).send(`${interaction.user} redeemed the code ${code}!`)
        interaction.reply({ content: `Success! You have redeemed that code for ${data.amount} credits!`, ephemeral: true })
    }

    if (interaction.commandName === "newcode") {
        let amount = interaction.options.get("amount")?.value
        let time = interaction.options.get("time")?.value
        let limit = interaction.options.get("limit")?.value
        let dmuser = interaction.options.get("dmuser")?.user
        let dmmessage = interaction.options.get("dmmessage")?.value

        let data = {
            expired: false,
            used: [],
            amount,
        }
        if (limit) data.limit = limit
        if (time) data.expiresAt = Date.now() + re.vars.ms(`${time}m`)
        let code = re.func.randomString(10)
        re.dbs.codes.set(code, data)

        if (dmuser) {
            let msg = `You have been sent a code! You can redeem it using the /redeem command in the main Rogue Worship Leader server! ${dmmessage ? dmmessage : ""}\n\`\`\`${code}\`\`\``
            dmuser.send(msg)
        }
        interaction.reply({ content: `Your code has been created:\n\`\`\`${code}\`\`\``, ephemeral: true })
    }

    if (interaction.commandName === "equipped") {
        let item = re.dbs.economy.get(`${interaction.guild.id}.${interaction.user.id}.duelBoost`)
        if(!item) return interaction.reply(`You don't have any weapons equipped right now!`)
        interaction.reply({ content: `You currently have a ${item.id} with ${item.durability} durability equipped` })
    }

    if (interaction.commandName == "duelofthefates") {
        let p1 = { user: interaction.member, health: maxHealth }
        let p2 = { user: interaction.options.get("user").member, health: maxHealth }

        p1.boost = re.dbs.economy.get(`${interaction.guild.id}.${p1.user.id}.duelBoost`) ?? null
        p2.boost = re.dbs.economy.get(`${interaction.guild.id}.${p2.user.id}.duelBoost`) ?? null

        let embed = generateEmbed(p1, p2, "*Match starting in 3...*")
        await interaction.reply({ embeds: [embed] })

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
        embed = generateEmbed(p1, p2, `\n🏆 **${winner.user.nickname}** has won the duel!`, embed)
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
    embed.addField(p1.user.nickname, `${p1.health}/${maxHealth} HP`, true)
    embed.addField(p2.user.nickname, `${p2.health}/${maxHealth} HP`, true)
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
    data.message = `**${attacker.user.nickname}** attacked **${attacked.user.nickname}**, dealing ${data.baseDamage} damage${attacker.boost ? `, and ${data.bonusDamage} bonus damage from their **${re.vars.tscwd(attacker.boost.id).replace(".", "")}**` : ""}!`
    return data
}

const checkDurability = (userid, guildid) => {
    let item = re.dbs.economy.get(`${guildid}.${userid}.duelBoost`)
    item.durability = item.durability - 1
    if(item.durability <= 0) {
        re.dbs.economy.delete(`${guildid}.${userid}.duelBoost`)
        re.client.users.cache.get(userid).send(`Your ${item.id} has broken!`)
    } else {
        re.dbs.economy.set(`${guildid}.${userid}.duelBoost`, item)
    }
}