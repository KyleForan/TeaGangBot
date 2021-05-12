const fs = require('fs')
const path = require('path')

const Discord = require('discord.js');
const Database = require('@replit/database')

const roleClaim = require('./roles/role-claim.js');
const setup = require('./setup.js')
const { prefix } = require('./config')

let bot = new Discord.Client({
	 intents: Discord.Intents.All ,
	 presence: {
    	status: 'dnd',
    	activity: {
      		name: `${prefix}help for commands`,
			type: 3,
		}
    }
});

bot.db = new Database()
bot.commands = new Discord.Collection();
bot.running = {
	blackjack: false,
}

bot.once('ready', async () => {

	console.log(await bot.db.getAll())

	console.log(`Logged in as ${bot.user.tag}.`)

	roleClaim(bot)
	setup(bot)

});

require('./server')();
bot.login(process.env.TOKEN);