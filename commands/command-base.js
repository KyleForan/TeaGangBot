const { prefix } = require('../config')

const validatePermissions = (permissions) => {
	const validPermissions = [
	'CREATE_INSTANT_INVITE', 'KICK_MEMBERS',
	'BAN_MEMBERS',           'ADMINISTRATOR',
	'MANAGE_CHANNELS',       'MANAGE_GUILD',
	'ADD_REACTIONS',         'VIEW_AUDIT_LOG',
	'PRIORITY_SPEAKER',      'STREAM',
	'VIEW_CHANNEL',          'SEND_MESSAGES',
	'SEND_TTS_MESSAGES',     'MANAGE_MESSAGES',
	'EMBED_LINKS',           'ATTACH_FILES',
	'READ_MESSAGE_HISTORY',  'MENTION_EVERYONE',
	'USE_EXTERNAL_EMOJIS',   'VIEW_GUILD_INSIGHTS',
	'CONNECT',               'SPEAK',
	'MUTE_MEMBERS',          'DEAFEN_MEMBERS',
	'MOVE_MEMBERS',          'USE_VAD',
	'CHANGE_NICKNAME',       'MANAGE_NICKNAMES',
	'MANAGE_ROLES',          'MANAGE_WEBHOOKS',
	'MANAGE_EMOJIS'
	]

	for (const perm of permissions){
		if(!validPermissions.includes(perm)) {
			throw new Error(`unknown permission nofe "${perm}"`);
		};
	};
}

const allcommands = []

module.exports = commandOptions => {

	let {
		commands,
		permissions = [],
	} = commandOptions;

	// command to array
	if(typeof commands === 'string') commands = [commands];
	if(permissions.length && typeof permissions === 'string') permissions = [permissions];

	validatePermissions(permissions);

	for(const command of commands) {
		allcommands[command] = {
			...commandOptions,
		}
	}
}

module.exports.listen = client => {
	client.on('message', msg => {
		const { member, content, guild } = msg;

		const args = msg.content.trim().split(/ +/);
		const name = args.shift().toLowerCase()

		if(name.startsWith(prefix)) {
			const command = allcommands[name.replace(prefix, '')]
			console.log(command)
			if(!command) return
		


			const {
				permissions = [],
				permissionError = 'You do not have permission to run this command',
				requiredRoles = [],
				minArgs = 0,
				maxArgs = null,
				expectedArgs = '',
				callback
			} = command


			for (const permission of permissions) {
				if(!member.hasPermission(permission)){
					msg.channel.send(permissionError)
					return
				}
			}

			for (const role of requiredRoles) {
				const foundRole = guild.roles.cache.find(r => r.name === role)

				if(!foundRole || member.roles.cache.has(foundRole)){
					msg.channel.send(`You must have ${role}`)
					return
				}
			}


			if(args.length < minArgs || (maxArgs !== null && args.length > maxArgs)) {
				msg.channel.send(`Incorrect syntax! Use ${prefix}${name.replace(prefix, '')} ${expectedArgs}`)
				return
			}

			callback(client, msg, args, args.join(' '))
		}
	})
}