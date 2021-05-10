const firstMessage = require('./first-message')
const config = require('./../config')

module.exports = client => {
	const channelId = config.roleChannelId

	const getEmoji = emojiName => client.emojis.cache.find(emoji => emoji.name === emojiName)

	const emojis = {
		Engineering: 'Engineering',
		Maths: 'Maths',
		Physics: 'Physics',
		Philosophy: 'Philosophy',
		Biology: 'Biology',
		Psychology: 'Psychology',
		LawPolitics: 'Law & Politics',
		Other: 'Other',

	}

	const reactions = []

	let emojiText = 'React for a role.\nChoose a class:\n'

	for (const key in emojis) {
		const emoji = getEmoji(key)
		reactions.push(emoji)

		const role = emojis[key]
		emojiText += `${emoji} = ${role}\n`
	}

	firstMessage(client, channelId, emojiText, reactions)

	const handleReact = (reaction, user, add) => {
		if (user.id === '837780527015919678') return; // bot

		const emoji = reaction._emoji.name
		const { guild } = reaction.message
		const roleName = emojis[emoji]

		if (!roleName) return;

		const role = guild.roles.cache.find(r => r.name === roleName)
		const member = guild.members.cache.find(m => m.id === user.id)

		if (add) {
			member.roles.add(role)
		} else {
			member.roles.remove(role)
		}

	}

	client.on('messageReactionAdd', (reaction, user) => {
		if (reaction.message.channel.id === channelId) {
			handleReact(reaction, user, true)
		}
	})

	client.on('messageReactionRemove', (reaction, user) => {
		if (reaction.message.channel.id === channelId) {
			handleReact(reaction, user, false)
		}


	})

}