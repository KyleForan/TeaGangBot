const economy = require('../../economy')

module.exports = {
	commands: ['pay'],
	minArgs: 2,
	maxArgs: 2,
	expectedArgs: '<target user> <amount>',
	callback: (bot, msg, args) => {
		const target = msg.mentions.users.first()
		if(!target || target.bot || (target.id == msg.author.id)) return msg.channel.send('please mention a valid user')

		const coins = args[1]
		if(isNaN(coins) || coins < 0) return msg.channel.send('please specify amount')

		const creditorData = economy.getInfo(target.id)
		const debtorData = economy.getInfo(msg.author.id)

		if(debtorData.balance < coins) return msg.channel.send('You dont have enough')

		creditorData.balance += +coins
		debtorData.balance -= +coins

		economy.updateInfo(target.id, { balance: creditorData.balance }, msg)
		economy.updateInfo(msg.author.id,{ balance: debtorData.balance }, msg)
		msg.channel.send(`payed ${coins} to ${target} `)
	}
}