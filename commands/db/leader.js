const { MessageEmbed } = require('discord.js')

module.exports = {
	commands: ['leaderboard', 'leader'],
	maxArgs: 0,
	callback: async (client, msg, args, text) => {
		
		const info = await client.db.getAll()

		if(!info) return msg.channel.send('No data stored for this server')

		const array = Object.entries(info)

        array.sort((a, b) => {
			if(a[1].xpInfo.level == b[1].xpInfo.level) {
				if (a[1].xpInfo.xp > b[1].xpInfo.xp) {
					return -1
				} else if (a[1].xpInfo.xp < b[1].xpInfo.xp) {
					return 1
				} else {
					return 0
				}
			} else if (a[1].xpInfo.level > b[1].xpInfo.level) {
				return -1
			} else {
				return 1
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
				value: `level: ${level}, xp: ${xp}`
			})
		}

		msg.channel.send(
			new MessageEmbed()
				.setColor('#e600e6')
				.setTitle(`**xp leaderboard**`)
				.addFields(fields)
				.setTimestamp()
				.setFooter(`Requested by: ${msg.member.displayName}`)
		)





	}
}