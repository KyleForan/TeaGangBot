module.exports = {
	commands: ['queue', 'q'],
	maxArgs: 0,
	callback: async (bot, msg, args) => {

		if (!msg.member.voice.channel) return msg.channel.send('You have to be in a voice channel.')

		let queue = await bot.distube.getQueue(msg);

		if (queue) {
			msg.channel.send(`Current queue:\n${queue.songs.map((song, id) =>
				`**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``).slice(0, 10).join('\n')}`)
		} else msg.channel.send('No music playing rn.')

	}

}