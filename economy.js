const fs = require("fs")
const dbPath = "./tempDB.json"

console.log(require(dbPath))

module.exports = (client) => {
	/* */
	return
}

const writeFile = (db) => {
    fs.writeFile(dbPath, JSON.stringify(db, null, 2), (err) => {
        if (err) return console.log(err)
        else console.log("Success!")
    })

	return
}

const getData = (db, userId) => {
	let data = db[userId]
	if(!data) data = setup(db, userId)

	return data
}

let setup = (db, userId) => {

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

module.exports.getInfo = (db, userId) => {
	
	return getData(db, userId)

}

module.exports.updateInfo = (db, userId, newData) => {

	const data = getData(db, userId)

	if(newData.balance < 0) data.balance = 0;

	let {
		balance = data.balance,
		daily = data.daily,
		xpInfo = data.xpInfo
	} = newData

	
	db[userId] = { balance, daily, xpInfo }

	writeFile(db)

	return
}

module.exports.changeBal = (db, userId, change) => {

	const data = getData(db, userId)

	console.log(!db == false, userId, change, !data == false)

	if (isNaN(change) || change % 1 != 0) {
		console.warn(`${change} is not a valid input`)
	}
	else {
		data.balance += change
		if (data.balance < 0) data.balance = 0

		console.debug(`Balance updated by ${change} to ${data.balance}`)
	}

	writeFile(db)
	

	return 

}