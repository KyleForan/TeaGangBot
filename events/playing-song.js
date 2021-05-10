module.exports = {
	name: 'playSong',
	dt: true,
	callback: (message, queue, song) => message.channel.send(
    	`Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
	)
}