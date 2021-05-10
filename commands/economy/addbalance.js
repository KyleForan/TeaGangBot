const economy = require('../../economy')

module.exports = {
	commands: ['addbalance', 'addbal'],
	admin: true,
	minArgs: 2,
	maxArgs: 2,
	expectedArgs: '<target user> <amount>',
	permissions: 'ADMINISTRATOR',
	callback: async (bot, msg, args) => {
		const target = msg.mentions.users.first()
		if(!target || target.bot || (target.id == '496780359598604328')) return msg.channel.send('please mention a valid user')

		const coins = args[1]
		if(isNaN(coins)) return msg.channel.send('please specify amount')

		const data = await economy.getInfo(bot.db, target.id)

		data.balance += +coins

		await economy.updateInfo(bot.db, target.id, data)
		msg.channel.send(`${coins} has been added to ${target} `)
	}
}