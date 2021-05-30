const Database = require('better-sqlite3')
let db = new Database('./TeaGang.db', { fileMustExist: true } ) // verbose: console.log, 

let setup = (userId) => {
	
	db.prepare('INSERT INTO data (userid) VALUES(?)').run(userId)

	return { userid: userId, balance: 50, daily: null, level: 1, xp: 0, debt: null, creditor: null, interest: 1.5 };

}

module.exports.getInfo = (userId) => {

	let query = db.prepare('SELECT * FROM data WHERE userid = ?')

	const row = query.get(userId)

	return (row === undefined) ? setup(userId) : row
		
}

module.exports.updateInfo = (userId, newData, msg) => {

	if(!newData) return console.log('No data given')

	let query = db.prepare('SELECT * FROM data WHERE userid = ?')
	let data =  query.get(userId)

	data = (data === undefined) ? setup(userId) : data

	let {
		balance= data.balance,
		daily= data.daily,
		level= data.level,
		xp = data.xp,
		debt = data.debt,
		creditor = data.creditor,
		interest = data.interest
	} = newData

	if(msg) {

		let { guild, author } = msg
		let role = guild.roles.cache.find(g => g.name === 'RICHBOI')
		let member = guild.members.cache.find(m => m.id === author.id)

		if (balance > 500000) {
			member.roles.add(role)
		} else {
			member.roles.remove(role)
		}

	}

	if((debt !== null && creditor !== null) && debt * (4/3) < balance) {
		
		msg.channel.send('Your debts are payed.')

		query = db.prepare('UPDATE data SET balance = balance + ? WHERE userid = ?')
		query.run(debt, creditor)

		balance -= debt;
		creditor = debt = null

	}

	


	query = db.prepare('UPDATE data SET balance = ?, daily = ?, level = ?, xp = ?, debt = ?, creditor = ?, interest = ? WHERE userid = ?')
	query.run(balance, daily, level, xp, debt, creditor, interest, userId)
	
}

module.exports.bjRunning = (userId, check) => {

	let query = db.prepare('SELECT * FROM blackjack WHERE userid = ?')
	let row = query.get(userId)

	if (row === undefined) {

		db.prepare('INSERT INTO blackjack (userid) VALUES(?)').run(userId)

		row = {userid: userId, running: 0, number: 0}
	}

	let {number, running} = row

	if (check) {
		if(running === 0) {
			running = 1
		} else {
			return 0
		}
	} else {
		running = 0
		number++
	}

	query = db.prepare('UPDATE blackjack SET running = ?, number = ? WHERE userid = ?')
	query.run(running, number, userId)

	return running

}