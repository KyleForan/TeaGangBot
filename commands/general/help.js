const Discord = require('discord.js');
const { prefix } = require('../../config.js')

module.exports = {
	commands: ['help', 'h'],
	maxArgs: 0,
	callback: (bot, msg, args) => {
		
		let fields = []

		bot.commands.forEach(command => {

			if(command.admin != true || msg.channel.name === 'admin-commands') {
				const aliases = command.commands.join(', ');
				const args = command.expectedArgs || 'null';

				fields.push({
					name: `**commands**: ${aliases}`,
					value: `**args**: _${args}_`,
				})
			}

			
		})

		const embed = new Discord.MessageEmbed()
			.setColor('#e600e6')
			.setTitle('**Help commands**')
			.setDescription(`**prefix: ${prefix}**`)
			.addFields(fields)
			.setTimestamp()
			.setFooter(`Requested by: ${msg.member.displayName}`)

		msg.channel.send(embed);
		msg.delete()

	}
}