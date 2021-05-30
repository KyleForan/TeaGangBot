const disbut = require('discord-buttons');

let accept = () => {
    console.log('accept')
}

let decline = () => {
    console.log('decline')
}

module.exports = {
	commands: ['button'],
	admin: true,
	callback: async (bot, msg, args, text) => {

        let btn1 = new disbut.MessageButton()
            .setLabel('Accept!')
            .setStyle('green')
            .setID('y');

        let btn2 = new disbut.MessageButton()
            .setLabel('Deny!')
            .setStyle('red')
            .setID('n');

        let message = await msg.channel.send(`test`, {buttons: [ btn1, btn2 ]});
        
		
		bot.on('clickButton', async (button) => {
        
            button.defer();

            (button.id === 'y') ? accept() : decline()

            button.message.delete()
            msg.delete()

        });

	}
}