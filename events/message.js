const { prefix } = require('../config')
const economy = require('../economy')
const randomNum = () => Math.floor(Math.random() * 26) + 25
const neededXp = level => level * level * 100

module.exports = {
	name: 'message',
	callback: async (msg, client) => {

		if(msg.author.bot) return;
		if (!msg.content.startsWith(prefix)) await addXP(client.db, msg)





		const channelIds = ['840316569116082227']

		if(channelIds.includes(msg.channel.id)){
			msg.react('👍')
			setTimeout(() => {
				msg.react('👎')
			}, 750)
		}
		
	}
}

let addXP = async (db, msg) => {
	const { member } = msg
	let info = await economy.getInfo(db, msg.author.id)
	
	let { xp, level } = info.xpInfo
	const levelup = neededXp(level)

	xp += randomNum()

	if(levelup < xp) {
		++level
		xp -= levelup
		msg.reply(`You ranked up to level ${level}`)
	}

	await economy.updateInfo(db, member.id, { xpInfo: { xp: xp, level: level, } })
}