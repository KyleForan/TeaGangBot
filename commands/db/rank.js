const { Rank } = require('canvacord')
const Discord = require('discord.js')
const { getInfo } = require('../../economy.js')

module.exports = {
	commands: ['rank', 'r'],
	maxArgs: 0,
	callback: (bot, msg, args) => {
		
		let info = getInfo(msg.member.id)

        console.log('rank')

		let { xp, level, balance } = info

		const rank = new Rank()
			.setAvatar(msg.author.displayAvatarURL({ dynamic: false, format: 'png' }))
			.setCurrentXP(xp)
			.setRequiredXP(level * level * 100)
			.setLevel(level)
            .setRank(balance, 'BALANCE')
			.setStatus(msg.member.presence.status)
			.setProgressBar('#42f569', 'COLOR', false)
			.setUsername(msg.author.username)
			.setDiscriminator(msg.author.discriminator)
		rank.build()
			.then(data => {
				const attatchment = new Discord.MessageAttachment(data, 'RankCard.png')
				msg.channel.send(attatchment)
			})


	}
}
