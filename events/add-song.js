module.exports = {
	name: 'addSong',
	dt: true,
	callback: (msg, queue, song) => msg.channel.send(
		`Playing \'${song.name}\' - \'${song.formattedDuration}\'\nRequested by ${song.user}`
	)
}