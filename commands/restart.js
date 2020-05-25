exports.run = async (client, message) => {
  await message.reply('Bot is shutting down.');
  client.commands.forEach(async (cmd) => {
    await client.unloadCommand(cmd);
  });
  process.exit(1);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Bot Admin',
};

exports.help = {
  name: 'restart',
  category: 'Sistema',
  description:
    'Desliga o bot. Se estiver rodando no PM2 o bot irá reiniciar autmomaticamente',
  usage: 'restart',
};
