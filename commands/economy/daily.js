const economy = require('../../economy')
const cooldown = 1000 * 60 * 60 * 24

module.exports = {
	commands: ['daily'],
	maxArgs: 0,
	callback: (bot, msg, args) => {

		let data = economy.getInfo(msg.author.id)

		if (data.daily != null && cooldown - (Date.now() - data.daily) > 0) {
			let timeObj = (cooldown - (Date.now() - data.daily));
			msg.channel.send(`You still have ${Math.floor(timeObj/1000/60/60)} hours until your next daily`)
		} else {
			economy.updateInfo(msg.author.id, {balance: data.balance += 50, daily: Date.now()}, msg) 

			msg.channel.send('50 added to your balance')
		}

	}
}