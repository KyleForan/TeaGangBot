module.exports = {
	name: 'guildMemberUpdate',
	callback: (oldMember, newMember, client) => {
		if (newMember.id === client.user.id && newMember.nickname != null) {
			newMember.setNickname(null)
		}
	}
}