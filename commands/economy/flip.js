const Database = require('better-sqlite3')
let db = new Database('./TeaGang.db', { fileMustExist: true } ) // verbose: console.log, 
const economy = require('../../economy')

module.exports = {
	commands: ['flip', 'f'],
    minArgs: 1,
	maxArgs: 2,
	expectedArgs: '<heads/tails> [bet]',
	callback: (bot, msg, args) => {

        let { balance } = economy.getInfo(msg.author.id)
		let bet = args[1] || 0

		if(isNaN(bet) || bet < 0 || (bet % 1 !== 0) ) return msg.channel.send('Enter a valid bet.')
        if(balance < bet) return msg.channel.send('Not enough money.')


		const coin = Math.floor(Math.random() * 2)
        const ht = ['h', 't']
        let win = false
        
        if (ht[coin] === args[0][0].toLowerCase()) win = true
        else bet *= -1

        msg.channel.send(`You ${win ? 'win' : 'lose'} ${args[1] || 0}`)

        db.prepare('UPDATE data SET balance = balance + ? WHERE userid = ?').run(bet, msg.author.id)
	}
}