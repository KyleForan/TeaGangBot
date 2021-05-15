const economy = require('../../economy')

module.exports = {
	commands: ['pay'],
	minArgs: 2,
	maxArgs: 2,
	expectedArgs: '<target user> <amount>',
	callback: async (bot, msg, args) => {
		const target = msg.mentions.users.first()
		if(!target || target.bot || (target.id == msg.author.id)) return msg.channel.send('please mention a valid user')

		const coins = args[1]
		if(isNaN(coins) || coins < 0) return msg.channel.send('please specify amount')

		const creditorData = await economy.getInfo(bot.db, target.id)
		const debtorData = await economy.getInfo(bot.db, msg.author.id)

		if(debtorData.balance < coins) return msg.channel.send('You dont have enough')

		creditorData.balance += +coins
		debtorData.balance -= +coins

		await economy.updateInfo(bot.db, target.id, creditorData)
		await economy.updateInfo(bot.db, msg.author.id, debtorData)
		msg.channel.send(`payed ${coins} to ${target} `)
	}
}