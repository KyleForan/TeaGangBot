const { MessageEmbed } = require('discord.js')
const Database = require('better-sqlite3')
let db = new Database('./TeaGang.db', { fileMustExist: true } ) // verbose: console.log, 

module.exports = {
	commands: ['richleaderboard', 'rleader', 'rl'],
	maxArgs: 0,
	callback: (client, msg, args, text) => {
		
		let query = db.prepare('SELECT * FROM data')

		const array = query.all()

        array.sort((a, b) => {
			if (a.balance > b.balance) {
					return -1
				} else if (a.balance < b.balance) {
					return 1
				} else {
					return 0
				}
        })

		let fields = []
		let num = 0;

        for(const data of array) {
			if(++num > 5) break;

			const member = msg.guild.members.cache.find(m => m.id == data.userid)

			fields.push({
				name: `${num}. ${member.displayName}`,
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