const fs = require('fs')
const path = require('path')

const Discord = require('discord.js');
const Database = require('@replit/database')
const economy = require ('./economy')

const roleClaim = require('./roles/role-claim.js');
const setup = require('./setup.js')
const { prefix } = require('./config')

let bot = new Discord.Client({
	 intents: Discord.Intents.All ,
	 presence: {
    	status: 'idle',
    	activity: {
      		name: `commands disabled`,
			type: 2,
		}
    }
	
});

bot.db = require("./tempDB.json")
bot.commands = new Discord.Collection();
bot.running = {
	blackjack: false,
}

bot.once('ready', async () => {

	// console.log(await bot.db.getAll())


	console.log(`Logged in as ${bot.user.tag}.`)

	// roleClaim(bot)
	
	setup(bot)

});

// require('./server')();
bot.login("ODQ4OTk5NjAxNTgzNTU0NjQx.YLUyfg.Q8gqr2vt3IdpzAerUzJ9SWhHy7M");