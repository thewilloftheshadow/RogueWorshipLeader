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
		console.log(data)
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
			amount
        }
        if (limit) data.limit = limit
        if (time) data.expiresAt = Date.now() + re.vars.ms(`${time}m`)
		let code = re.func.randomString(10)
		console.log(data)
		re.dbs.codes.set(code, data)

		if(dmuser){
			let msg = `You have been sent a code! You can redeem it using the /redeem command in the main Rogue Worship Leader server! ${dmmessage ? dmmessage : ""}\n\`\`\`${code}\`\`\``
			dmuser.send(msg)
		}
		interaction.reply({content: `Your code has been created:\n\`\`\`${code}\`\`\``, ephemeral: true})
    }
})
