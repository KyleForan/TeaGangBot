

module.exports = {
	commands: ['dbreset', 'dbr', 'reset'],
	expectedArgs: '<user>',
	admin: true,
	minArgs: 1,
	maxArgs: 1,
	permissions: ['ADMINISTRATOR'],
	callback: async (client, msg, args, text) => {
		const target = msg.mentions.users.first()

		if(target && target.bot) return

		if(args[0] == 'all') await client.db.empty()
		if(target) await client.db.delete(target.id)

		console.log(`deleted ${target.username || 'all'} data`)
	}
}