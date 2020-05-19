exports.run = async (client, message, args, level) => {
  const friendly = client.config.permLevels.find((l) => l.level === level).name;
  await message.reply(`Seu nível de permissão é: ${level} - ${friendly}`);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User',
};

exports.help = {
  name: 'auth',
  category: 'Sistema',
  description:
    'Tells you your permission level for the current message location.',
  usage: 'auth',
};
