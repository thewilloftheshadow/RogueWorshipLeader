const re = require(`../resources.js`).data

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
        if (!item) return interaction.reply(`You don't have any weapons equipped right now!`)
        interaction.reply({ content: `You currently have a ${item.id} with ${item.durability} durability equipped` })
    }

    if (interaction.commandName == "duelofthefates") {
        let attackee = interaction.options.get("user").member
        let amount = interaction.options.get("amount")?.value
        let unbData1 = await re.unb.getUserBalance(interaction.guild.id, interaction.user.id) 
        let unbData2 = await re.unb.getUserBalance(interaction.guild.id, attackee.id) 
        if(unbData1.cash < amount) return interaction.reply({content: `You don't have enough cash to place a bet of ${amount} on this duel!`})
        if(unbData2.cash < amount) return interaction.reply({content: `The person you have challenged doesn't have enough cash to place a bet of ${amount} on this duel!`})


        let accept = new re.Discord.MessageButton()
            .setLabel("Accept")
            .setStyle("SUCCESS")
            .setCustomId(`${attackee.id}=duel:accept=${interaction.user.id};${attackee.id}${amount ? `;${amount}` : ""}`)
        let decline = new re.Discord.MessageButton().setLabel("Decline").setStyle("DANGER").setCustomId(`${attackee.id}=duel:decline`)
        let row = new re.Discord.MessageActionRow().addComponents(accept, decline)
        interaction.channel.send({ content: `${attackee}, ${interaction.member} has challenged you to a Duel of the Fates${amount ? ` for ${amount} credits` : ""}. Do you accept?`, components: [row] })
        interaction.reply({ content: "Challenge has been sent!", ephemeral: true })
    }
})
