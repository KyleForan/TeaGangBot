const { MessageEmbed } = require('discord.js')
const economy = require("../../economy")

module.exports = {
	commands: ['richleaderboard', 'rleader', 'rl'],
	maxArgs: 0,
	callback: async (client, msg, args, text) => {
		
		// ! VERY TEMP
		const info = client.db

		if(!info) return msg.channel.send('No data stored for this server')

		const array = Object.entries(info)

        array.sort((a, b) => {
			if (a[1].balance > b[1].balance) {
				return -1
			} else if (a[1].balance < b[1].balance) {
				return 1
			} else {
				return 0
			}
        })
		
		let fields = []
		let num = 0;

        for(const entry of array) {

			console.log(entry)

			// continue

			const id = entry[0]
			const data = entry[1]

			console.log(id, data)

			const member = msg.guild.members.cache.find(m => m.id == id)
			const { xp, level } = data.xpInfo

			if(++num > 5) break;
			// if (!member) break;


			fields.push({
				name: `${num}. ${member?.displayName || "N/A"}`,
				value: `balance: ${data.balance}`
			})
		}

		msg.channel.send(
			new MessageEmbed()
				.setColor('#e600e6')
				.setTitle(`**rich leaderboard**`)
				.addFields(fields)
				.setTimestamp()
				.setFooter(`Requested by: ${msg.member.displayName}`)
		)





	}
}