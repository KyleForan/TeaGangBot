const fs = require('fs')
const path = require('path')

const Discord = require('discord.js');
const economy = require ('./economy')

const setup = require('./setup.js')

let bot = new Discord.Client({
	intents: Discord.Intents.All ,
	presence: {
		status: 'idle',
    	activity: {
			name: `Active`,
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
	console.log(`Logged in as ${bot.user.tag}.`)
	
	setup(bot)
	
});

require('dotenv').config()

bot.login(process.env.TOKEN);