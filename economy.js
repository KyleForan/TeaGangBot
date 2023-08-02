const fs = require("fs")
const dbPath = "./tempDB.json"

console.log(require(dbPath))

module.exports = (client) => {
	/* */
}

const writeFile = (db) => {
    fs.writeFile(dbPath, JSON.stringify(db, null, 2), (err) => {
        if (err) return console.log(err)
        else console.log("Success!", db)
    })
}

let setup = async (db, userId) => {

	const template = {
		balance: 0,
		daily: null,
		xpInfo: {
			xp: 0,
			level: 1
		}
	}
	db[userId] = template

	writeFile(db)
	
	return template
}

module.exports.getInfo = async (db, userId) => {
	
	let data = db[userId]
	if(!data) data = setup(db, userId)
	
	return data

}

module.exports.updateInfo = async (db, userId, newData) => {

	let data = await db[userId]
	if(!data) data = setup(db, userId)

	

	if(data.balance + newData.balance < 0) data.balance = 0;

	let {
		balance = data.balance,
		daily = data.daily,
		xpInfo = data.xpInfo
	} = newData

	
	db[userId] = { balance, daily, xpInfo }

	writeFile(db)
}