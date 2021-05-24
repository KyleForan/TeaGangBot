const Database = require('better-sqlite3')
let db = new Database('./TeaGang.db', { fileMustExist: true } ) // verbose: console.log, 

let setup = (userId) => {
	
	db.prepare('INSERT INTO data (userid) VALUES(?)').run(userId)
	console.log('setup')

	return { userid: userId, balance: 50, daily: null, level: 1, xp: 0 };

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
		xp = data.xp
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

	query = db.prepare('UPDATE data SET balance = ?, daily = ?, level = ?, xp = ? WHERE userid = ?')
	query.run(balance, daily, level, xp, userId)
	
}