const economy = require('../economy')

module.exports = {
	commands: ['eval'],
	admin: true,
	callback: async (bot, msg, args, text) => {
		try{
			const channel = bot.guilds.cache.find(ch => ch.id === '790744113661607983').channels.cache.find(ch => ch.id === '841374624402505729')
			const command = `(async() => ${text})()`

			if(msg.author.id !== '496031546088751135') return


			channel.send(`${new Date().toDateString()}\n${command}`)

			eval(command)
		} finally {
			msg.delete()
		}

	}
}