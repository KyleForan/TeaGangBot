const Discord = require('discord.js');

const roleClaim = require('./roles/role-claim.js');
const setup = require('./setup.js')
const { prefix, token } = require('./config')


let bot = new Discord.Client({
	 intents: Discord.Intents.All ,
	 presence: {
    	status: 'online',
    	activity: {
      		name: `${prefix}help for commands`,
			type: 2,
		}
    }
});

require('discord-buttons')(bot); //Starting the discord-buttons class



bot.once('ready', () => {


	console.log(`Logged in as ${bot.user.tag}.`)


	// roleClaim(bot)
	setup(bot)

});

bot.login(token);