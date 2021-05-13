const economy = require('../../economy')
let bjName = 'blackjack'
const face = ['Ace', 'Jack','Queen','King']

const randomNum = () => Math.floor(Math.random() * 13) + 1
const getEmoji = (emojiName, bot) => bot.emojis.cache.find(emoji => emoji.name === emojiName)
const faceCheck = val => {
	if(val > 10) return face[val-10]
	if(val == 1) return face[0]
	return val
}
const valCalc = (vals) => {
	let total = 0

	for(const value of vals) {
		if (value > 10) total += 10
		if (value > 1 && value < 11) total += value
		if (value == 1) total += (total + 11 > 21) ? 1 : 11
	}
	return total
}
const gameEnd = (bot, message) => {
	bot.running.blackjack = false
	setTimeout(() => {
		if(!message) return
		message.delete()
	}, 5000)
}

module.exports = {
	commands: ['blackjack', '21'],
	minArgs: 1,
	maxArgs: 1,
	expectedArgs: '<bet>',
	callback: async (bot, msg, args, text) => {

		// msg.channel.send('Blackjack disbled for now.')

		if (bot.running.blackjack == true) return msg.reply('Game is already running please wait')

		const bjChannel =  msg.guild.channels.cache.find(ch => ch.name == bjName)
		const values = [randomNum(), randomNum()]
		let data = await economy.getInfo(bot.db, msg.author.id)

		if(isNaN(args[0])) return msg.channel.send('please specify amount')
		if(!data) data = { balance: 0, daily: null, xpInfo: { xp: 0, level: 1, } }
		if(args[0] > data.balance) return msg.channel.send('You dont have enough for that bet')

		bot.running.blackjack = true

		const coins = +args[0]

		const game = async (name, bjMsg, type, bot, id) => {

			let total = valCalc(values)

			if (type == 'hit') {
				if(total < 21) {
					hand = []

					for (value of values) hand.push(faceCheck(value))
					
					bjMsg.react(getEmoji('Hit', bot))
					setTimeout(() => {
						bjMsg.react(getEmoji('Hold', bot))
					}, 750)

					bjMsg.edit(`welcome ${name}\nYour hand: ${hand.join(', ')}\n hit or fold?`)

				} else if (total == 21) {
					bjMsg.edit(`Congratulations your total is 21.\nYou won ${coins*1.5}`)
					data.balance += coins * 1.5
					gameEnd(bot, bjMsg)

				} else {
					bjMsg.edit(`${name} has gone bust.\nYou lost ${coins}`)
					data.balance += (coins * -1)
					gameEnd(bot, bjMsg)
				}
			} else if (type == 'hold') {
				let compTotal = valCalc([randomNum(), randomNum()])
				
				if(compTotal > 21 || compTotal < total) {
					// play win
					bjMsg.edit(`${name} has won.\nYou won ${coins}`)
					data.balance += coins
					gameEnd(bot, bjMsg)

				} else if (compTotal > total) {
					// comp wins
					bjMsg.edit(`${name} has lost.\nYou lost ${coins}`)
					data.balance += (coins * -1)
					gameEnd(bot, bjMsg)

				} else if (compTotal == total) {
					// draw
					bjMsg.edit(`it's a draw.\nYou got ${args[0]} back`)
					gameEnd(bot, bjMsg)

				} 	

			}
			
			// await economy.updateInfo(bot.db, id, {
			// balance: data.balance,
			// xpInfo: {
			// 	xp: data.xp + 70,
			// 	level: data.level
			// }
			// })

		}

		const bjMsg = await bjChannel.send(`${msg.member.displayName} welcome.\nstarting game...`)

		await game(msg.member.displayName, bjMsg, 'hit', bot, msg.member.id)

		const onReact = async (msgReact, user) => {
			if(user.id == '837780527015919678') return;
			
			const reacts = msgReact.message.reactions

			if(user.id != msg.author.id) reacts.cache.find(react => react.emoji == msgReact.emoji).users.remove(user)
			if(user.id == msg.author.id) {
				reacts.removeAll()

				// hit
				if(msgReact.emoji.name == 'Hit'){

					values.push(randomNum())
					await game(msg.member.displayName, bjMsg, 'hit', bot, msg.member.id)

				} else if (msgReact.emoji.name == 'Hold') {

					await game(msg.member.displayName, bjMsg, 'hold', bot, msg.member.id)

				}
			}

			if (bot.running.blackjack == false) bot.removeListener('messageReactionAdd', onReact);

		}

		bot.on('messageReactionAdd', onReact)
	}
}