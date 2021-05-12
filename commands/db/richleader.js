const { MessageEmbed } = require('discord.js')

module.exports = {
	commands: ['richleaderboard', 'rleader', 'rl'],
	maxArgs: 0,
	callback: async (client, msg, args, text) => {
		
		const info = await client.db.getAll()

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

        for(const data of array) {
			const member = msg.guild.members.cache.find(m => m.id == data[0])
			const { xp, level } = data[1].xpInfo
			let embedValue

			if(++num > 5) break;


			fields.push({
				name: `${num}. ${member.displayName}`,
				value: `balance: ${data[1].balance}`
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