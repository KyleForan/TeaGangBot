const addReaction = (msg, reactions) => {
  if(reactions.length === 0) return;

  msg.react(reactions[0])
  reactions.shift()
  
  if(reactions.length > 0) {
    setTimeout(() => addReaction(msg, reactions), 750)
  }
}

module.exports = async (client, id, text, reactions = []) => {
  const channel = await client.channels.fetch(id)

  channel.messages.fetch().then((msg) => {
    if (msg.size === 0) {
      	channel.send(text).then((msg) => {
        addReaction(msg, reactions)
      })
    } else {
		// console.log(msg)
     	for ( const message of msg ) {
			// console.log(message[1].content + '\n')
        	message[1].edit(text)
        	addReaction(message[1], reactions)
      	}
    }
  })
}