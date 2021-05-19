const economy = require('../../economy')

module.exports = {
	commands: ['balance', 'bal'],
	maxArgs: 1,
	expectedArgs: '[target user]',
	callback: (bot, msg) => {
		const target = msg.mentions.users.first() || msg.author
		if(target.bot) return

		const info = economy.getInfo(target.id)

		msg.channel.send(`${target} has ${info.balance}!`)
	}
}