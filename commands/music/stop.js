
module.exports = {
	commands: ['stop', 'st'],
	maxArgs: 0,
	callback: async (bot, msg, args) => {
		if(!msg.member.voice.channel) return msg.channel.send('You have to be in a voice channel.')

		let queue = await bot.distube.getQueue(msg);

		if(queue) {
			bot.distube.stop(msg)
		} else msg.channel.send('No music playing rn.')

	}
}