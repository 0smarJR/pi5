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
    'Informa o seu nível de permissão.',
  usage: 'auth',
};
