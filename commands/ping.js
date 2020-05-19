exports.run = async (client, message) => {
  const msg = await message.channel.send('Ping?');
  msg.edit(
    `Pong! A Latência é ${msg.createdTimestamp
      - message.createdTimestamp}ms. A Latência da API é ${Math.round(client.ping)}ms`,
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User',
};

exports.help = {
  name: 'ping',
  category: 'Sistema',
  description: "É tipo... Ping. Então Pong. E não é Ping-Pong.",
  usage: 'ping',
};
