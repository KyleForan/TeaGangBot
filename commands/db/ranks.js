const { Rank } = require('canvacord')
const Discord = require('discord.js')
const { prefix } = require('../../config.js')
const economy = require('../../economy.js')

module.exports = {
	commands: ['rank', 'r'],
	maxArgs: 0,
	callback: async (bot, msg, args) => {
		
		let info = await economy.getInfo(bot.db, msg.member.id)

		let { xpInfo } = info
		// console.log('info ', xpInfo)

		const rank = new Rank()
			.setAvatar(msg.author.displayAvatarURL({ dynamic: false, format: 'png' }))
			.setCurrentXP(xpInfo.xp)
			.setRequiredXP(xpInfo.level * xpInfo.level * 100)
			.setLevel(xpInfo.level)
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

// 496031546088751135