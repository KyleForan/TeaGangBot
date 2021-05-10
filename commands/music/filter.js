module.exports = {
	commands: ['filter', 'f'],
	expectedArgs: '`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`',
	minArgs: 1,
	maxArgs: 1,
	callback: async (bot, msg, args, text) => {

		if(!msg.member.voice.channel) return msg.channel.send('You have to be in a voice channel.')

		let queue = await bot.distube.getQueue(msg);

		if(queue) {
			if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`].includes(args[0])) {
				const filter = bot.distube.setFilter(msg, args[0])
				msg.channel.send(`Current queue filter: ${filter || 'Off'}`)
			}
		} else msg.channel.send('No music playing rn.')

	}
}