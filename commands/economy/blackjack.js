const economy = require('../../economy')

const getEmoji = (emojiName, bot) => bot.emojis.cache.find(emoji => emoji.name === emojiName)
var suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
const suitEmoji = {Spades: '♠️', Hearts: '♥️', Diamonds: '♦️', Clubs: '♣️'}
var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
var deck = []

const finish = (msg, botMsg) => {
	
	setTimeout(() => {
		botMsg.delete()
		msg.delete()
	}, 7000)

}

const aceCheck = (hand, total) => {

	for(card of hand) if(card.Value === 'A') {
		total -= 10
		card.weight -= 10
		if(total <= 21) return 1
	}
	
	return 0
	
}

const shuffle = () => {

	for (var i = 0; i < 1000; i++) {

		var card1 = Math.floor((Math.random() * deck.length));
		var card2 = Math.floor((Math.random() * deck.length));
		var tmp = deck[card1];

		deck[card1] = deck[card2];
		deck[card2] = tmp;
	}

}

const createDeck = () => {
	for (const face of values) {
		for(const type of suits) {
			var weight = parseInt(face);

			if (['K', 'Q', 'J'].includes(face)) weight = 10;
			if (face == "A") weight = 11;

			var card = { Value: face, Suit: type, Weight: weight };
			deck.push(card);
		}
	}

	shuffle()

	console.log('Deck Created')
}

createDeck();

const deal = () => {

	if(deck.length == 0) {
		createDeck()
	}

	return deck.pop()

}

const display = (hand) => {
	
	const display = [];
	
	for (card of hand) display.push(`${suitEmoji[card.Suit]}${card.Value}`)

	return display.join(', ')
}

const hold = (ogMsg, botMsg, hand, total, data) => {

	
	if(total > 21 && !aceCheck(hand, total)) {
		
		botMsg.edit('You lose')
		finish(ogMsg, botMsg)
		return

	} else {

		let compHand = [deal(), deal()], run = 1

		while(run) {
			let compTotal = 0;
			for(card of compHand) compTotal += card.Weight

			if(compTotal >= total && compTotal <= 21) {

				botMsg.edit(`You lost ${data.coins}\nYour hand: ${display(hand)}\nDealer's hand: ${display(compHand)}`)
				finish(ogMsg, botMsg)
				economy.updateInfo(ogMsg.author.id, {balance: data.balance + data.coins * -1}, ogMsg)
				run = 0

			} else if (compTotal <= 14) {
				
				compHand.push(deal())
				continue;

			} else {
				
				botMsg.edit(`You won ${data.coins}\nYour hand: ${display(hand)}\nDealer's hand: ${display(compHand)}`)
				finish(ogMsg, botMsg)
				economy.updateInfo(ogMsg.author.id, {balance: data.balance + data.coins}, ogMsg)
				run = 0

			}
		}

	}

}

const playerMove = (bot, ogMsg, botMsg, hand, data) => {

	let total = 0;
	for(card of hand) total += card.Weight

	if((total > 21 && !aceCheck(hand, total))) {
		
		botMsg.edit(`You lost ${data.coins}\nYour hand: ${display(hand)}`)
		economy.updateInfo(ogMsg.author.id, {balance: data.balance + data.coins * -1}, ogMsg)
		finish(ogMsg, botMsg)
		return

	} else if (total === 21) {

		botMsg.edit(`You won ${data.coins}\nYour hand: ${display(hand)}`)
		finish(ogMsg, botMsg)
		economy.updateInfo(ogMsg.author.id, {balance: data.balance + data.coins}, ogMsg)
		return 

	}


	bot.once('messageReactionAdd', (msgReact, user) => {		
		if(!user.bot) msgReact.users.remove(user)

		if(user.id !== ogMsg.author.id || msgReact.message.id !== botMsg.id) return playerMove(bot, ogMsg, botMsg, hand, data)
		

		if(msgReact.emoji.name === 'Hit') {
			hand.push(deal())
			botMsg.edit(`${ogMsg.author} Your hand:\n${display(hand)}`)
			playerMove(bot, ogMsg, botMsg, hand, data)
		} else if(msgReact.emoji.name === 'Hold') {
			hold(ogMsg, botMsg, hand, total, data)
		} else return playerMove(bot, ogMsg, botMsg, hand, data)

	})

}


const setup = async (bot, msg, args) => {

	const { balance } = economy.getInfo(msg.author.id)

	if(!args[0] || isNaN(args[0]) || args[0] < 0 || args[0] > 1000000) return msg.channel.send('Please enter a valid bet.')
	if(args[0] > balance) return msg.channel.send('You dont have enough money to make that bet.')

	const coins = +args[0]

	const channel = msg.guild.channels.cache.find(ch => ch.name.toLowerCase() === 'blackjack')	
	const botMsg = await channel.send('Starting...')

	const hand = [deal(), deal()]

		
	botMsg.edit(`${msg.author} Your hand:\n${display(hand)}`)

	botMsg.react(getEmoji('Hit', bot))
	setTimeout(() => {
		botMsg.react(getEmoji('Hold', bot))
	}, 500)

	playerMove(bot, msg, botMsg, hand, {coins: coins, balance: balance})


}





module.exports = {
	commands: ['blackjack', '21'],
	minArgs: 1,
	maxArgs: 1,
	expectedArgs: '<bet>',
	callback: (bot, msg, args, text) => {

		setup(bot, msg, args)
		
		
	}
}