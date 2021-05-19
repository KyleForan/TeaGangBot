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

module.exports.updateInfo = (userId, newData, bot) => {

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


	// const user = bot.users.cache.find(g => g.id === userId)
	// const guild = user.guilds.cache.find(g => g.id === '818937983348637776')
	// const role = guild.roles.cache.find(g => g.name === 'RICHBOI')
	// console.log(user)

	// console.log(guild.name, role.name, user.name)

	if(balance > 1000000) {

	} else {

	}

	query = db.prepare('UPDATE data SET balance = ?, daily = ?, level = ?, xp = ? WHERE userid = ?')
	query.run(balance, daily, level, xp, userId)
	
}