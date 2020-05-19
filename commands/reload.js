exports.run = async (client, message, args) => {
  if (!args || args.length < 1) return message.reply('Você deve fornecer um comando para recarregar. Derp.');

  let response = await client.unloadCommand(args[0]);
  if (response) return message.reply(`Erro descarregando: ${response}`);

  response = client.loadCommand(args[0]);
  if (response) return message.reply(`Erro carregando: ${response}`);

  message.reply(`O comando \`${args[0]}\` foi recarregado!`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Bot Admin',
};

exports.help = {
  name: 'reload',
  category: 'Sistema',
  description: 'Recarrega um comando que foi modificado.',
  usage: 'reload [comando]',
};
