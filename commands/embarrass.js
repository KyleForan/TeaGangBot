const list = require('../lists.json').embarrassingThings

module.exports = {
	commands: ['embarrass'],
	maxArgs: 1,
	expectedArgs: '<user>',
	callback: (bot, msg, args) => {
		const random = Math.floor(Math.random() * list.length)
		const target = msg.mentions.members.first()

		if(!target) return msg.channel.send('mention a valid user')
		
		msg.channel.createWebhook(target.displayName, {
			avatar: target.user.avatarURL(),
		})
			.then(async webhook => {=
				await webhook.send(list[random])
				await webhook.delete()
			})
			.catch(console.error);
	}
}