const Discord = require('discord.js');
const fs = require('fs')
const path = require('path')

module.exports = bot => {
	const baseFile = 'command-base.js';
	const commandBase = require(`./commands/${baseFile}`)
	bot.commands = new Discord.Collection()

	const readCommands = (dir,  type) => {
		const files = fs.readdirSync(path.join(__dirname, dir))

		for (const file of files) {
			const stat = fs.lstatSync(path.join(__dirname, dir, file))

			if(stat.isDirectory()) {
				
				readCommands(path.join(dir, file), type)
			} else if (file !== baseFile) {
				const option = require(path.join(__dirname, dir, file))
				if(type === 'command') {
					bot.commands.set(option.commands[0], option)
					commandBase(option)
				};
				if(type === 'event') {
					bot.on(option.name, (...args) => option.callback(...args, bot));
				};
			}
		}

	}

	readCommands('commands', 'command')
	readCommands('events', 'event')

	commandBase.listen(bot)
}