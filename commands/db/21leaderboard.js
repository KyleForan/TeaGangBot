const { MessageEmbed } = require('discord.js')
const Database = require('better-sqlite3')
let db = new Database('./TeaGang.db', { fileMustExist: true } ) // verbose: console.log, 

module.exports = {
	commands: ['21l', 'bjl', 'blackjackleaderboard'],
	maxArgs: 0,
	callback: async (bot, msg, args) => {
		
		
		let query = db.prepare('SELECT * FROM blackjack')

		const array = query.all()

		array.sort((a, b) => {
            if (a.number > b.number) {
                return -1
            } else if (a.number < b.number) {
                return 
            } else {
                return 0
            }
		})

		let fields = [ ]
		let num = 0;

		for(const element of array) {
			if(++num > 5) break;

			let name = msg.guild.members.cache.find(m => m.id == element.userid)

			fields.push({
				name: `**${num}**: ${name.displayName}`,
				value: `**Number of games**: _${element.number}_`,
			})
		}
		
		const embed = new MessageEmbed()
			.setColor('#e600e6')
			.setTitle('**Blackjack Leaderboard**')
			.addFields(fields)
			.setTimestamp()
			.setFooter(`Requested by: ${msg.member.displayName}`)

		msg.channel.send(embed);


	}
}

// 496031546088751135