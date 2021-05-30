const economy = require('../../economy')
const disbut = require('discord-buttons');

const check = (bot, msg, target, coins) => {


    const creditorData = economy.getInfo(msg.author.id)
    const debtorData = economy.getInfo(target.id)

    if(creditorData.balance < coins) return msg.channel.send('You dont have enough')
    if(debtorData.debt != null) return msg.channel.send('Debtor already owes money')

    let btn1 = new disbut.MessageButton()
        .setLabel('Accept!')
        .setStyle('green')
        .setID('y');

    let btn2 = new disbut.MessageButton()
        .setLabel('Deny!')
        .setStyle('red')
        .setID('n');

    msg.channel.send(`${msg.member.displayName} has offered ${target.displayName} a loan of ${coins}\nIntrest: ${creditorData.interest}, Debt: ${coins * creditorData.interest}`, {buttons: [ btn1, btn2 ]});

    bot.on('clickButton', function listener(button) {

        button.defer();
        
        if(button.clicker.user.id !== target.id) return 

    
        if (button.id === 'y') {
            
            creditorData.balance -= +coins
            debtorData.balance += +coins

            msg.channel.send(`${target.displayName} Accepted\nCurrent balance : ${debtorData.balance}`)

            economy.updateInfo(msg.author.id, { balance: creditorData.balance }, msg)
            economy.updateInfo(target.id,{ balance: debtorData.balance, debt: coins*creditorData.interest, creditor: msg.author.id }, msg)

        } else if (button.id === 'n') {
            msg.channel.send('Offer rejected')
        }
    
        button.message.delete()
        msg.delete()

        bot.off('clickButton', listener)
    
    })
}




module.exports = {
	commands: ['loan', 'l'],
	minArgs: 2,
	maxArgs: 2,
	expectedArgs: '<target user> <amount>',
	callback: (bot, msg, args) => {
		const target = msg.mentions.members.first()
		if(!target || (target.id == msg.author.id)) return msg.channel.send('please mention a valid user')

		const coins = args[1]
		if(isNaN(coins) || coins <= 0) return msg.channel.send('please specify amount')

        

        check(bot, msg, target, coins)
        console.log(target.displayName, coins)
        
	}
}

   