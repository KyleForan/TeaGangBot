module.exports = {
	commands: ['clear', 'c'],
	expectedArgs: '<amount>',
	admin: true,
	minArgs: 1,
	maxArgs: 1,
	permissions: ['ADMINISTRATOR'],
	callback: (client, msg, args, text) => {
		let amount = args[0]

		if(amount <= 0 ) return msg.channel.send('Not a valid number,')
		if(amount > 100) amount = 100

		msg.channel.bulkDelete(amount, true)
	}
}
		