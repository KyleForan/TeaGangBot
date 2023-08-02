const economy = require('../../economy')
const cooldown = 1000 * 60 * 60 * 6 // Every 6 hours

module.exports = {
	commands: ['daily'],
	maxArgs: 0,
	callback: async (bot, msg, args) => {

		let data = await economy.getInfo(bot.db, msg.author.id)

		if (data.daily != null && cooldown - (Date.now() - data.daily) > 0) {
			let timeObj = (cooldown - (Date.now() - data.daily));
			msg.channel.send(`You still have ${Math.floor(timeObj/1000/60/60)} hours until your next daily`)
		} else {
			await economy.updateInfo(bot.db, msg.author.id, {balance: data.balance += 50, daily: Date.now()}) 

			msg.channel.send('50 added to your balance')
		}

	}
}