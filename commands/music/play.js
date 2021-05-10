module.exports = {
	commands: ['play', 'p'],
	expectedArgs: '<song name>',
	minArgs: 1,
	callback: (bot, msg, args, songName) => {

		if(!msg.member.voice.channel) return msg.channel.send('You have to be in a voice channel.')

		bot.distube.play(msg, songName)

	}
}