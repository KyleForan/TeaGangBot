const economy = require('../../economy')

module.exports = {
	commands: ['setinterest', 'si', 'setint'],
	maxArgs: 1,
	expectedArgs: '[interest rate]',
	callback: (bot, msg, args) => {
		
        let interest = args[0] || 1.5

        if (isNaN(interest) || interest < 1 || interest > 3) interest = 1.5
        if(interest % 0.1 != 0) interest = Math.round(interest * 10) /10

        economy.updateInfo(msg.author.id, { interest: interest }, msg)
		msg.channel.send(`Interest set to ${interest}`)

	}
}