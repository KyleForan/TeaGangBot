const { MessageEmbed } = require('discord.js')
const Database = require('better-sqlite3')
let db = new Database('./TeaGang.db', { fileMustExist: true } ) // verbose: console.log, 

module.exports = {
	commands: ['leaderboard', 'toplevels', 'lead'],
	maxArgs: 0,
	callback: async (bot, msg, args) => {
		
		
		let query = db.prepare('SELECT * FROM data')

		const array = query.all()

		array.sort((a, b) => {
			if(a.level == b.level) {
				if (a.xp > b.xp) {
					return -1
				} else if (a.xp < b.xp) {
					return 
				} else {
					return 0
				}
			} else if (a.level > b.level) {
				return -1
			} else {
				return 1
			}
		})

		let fields = [ ]
		let num = 0;

		for(const element of array) {
			if(++num > 5) break;

			let name = msg.guild.members.cache.find(m => m.id == element.userid)

			fields.push({
				name: `**${num}**: ${name.displayName}`,
				value: `**levels**: _${element.level}_, **xp**: _${element.xp}_`,
			})
		}
		
		const embed = new MessageEmbed()
			.setColor('#e600e6')
			.setTitle('**Leaderboard**')
			.addFields(fields)
			.setTimestamp()
			.setFooter(`Requested by: ${msg.member.displayName}`)

		msg.channel.send(embed);


	}
}

// 496031546088751135