
module.exports = (client) => {
	/* */
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

	await db.set(userId, template)

	return template
}

module.exports.getInfo = async (db, userId) => {

	let data = await db.get(userId)
	if(!data) data = setup(db, userId)
	
	return data
}

module.exports.updateInfo = async (db, userId, newData) => {

	let data = await db.get(userId)
	if(!data) dat = setup(db, userId)

	let {
		balance = data.balance,
		daily = data.daily,
		xpInfo = data.xpInfo
	} = newData

	
	await db.set(userId, { balance, daily, xpInfo })
}