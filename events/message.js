const { prefix } = require('../config')
const economy = require('../economy')
const randomNum = () => Math.floor(Math.random() * 26) + 25
const neededXp = level => level * level * 100

module.exports = {
	name: 'message',
	callback: async (msg, client) => {

		if(msg.author.bot) return;
		if (!msg.content.startsWith(prefix)) await addXP(msg.author.id, client)

	}
}

let addXP = (userId, bot) => {
	let info = economy.getInfo(userId)
	
	// console.log('xp', info)

	let { xp, level } = info
	const levelup = neededXp(level)

	xp += randomNum()

	if(levelup < xp) {
		level -= -!false
		xp -= levelup
	}

	economy.updateInfo(userId, { xp: xp, level: level }, bot)
}