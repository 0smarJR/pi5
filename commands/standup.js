exports.run = async (client, message, args) => {
  if (!args || args.length < 1) {
    const reports = client.standup
      .findAll('day', new Date().getDate())
      .filter((report) => report.channel === message.channel.name);
    reports.forEach((report) => message.channel.send(
      `:construction_worker: __**${report.member}**__:\n${report.text}`,
    ));
    if (reports.length === 0) message.channel.send('Nenhum relatório enviado ainda!');
  } else if (args && message.guild) {
    const member = message.author.username;
    const text = args.join(' ');
    const key = `${message.guild.id}-${message.channel.name}-${
      message.author.id
    }-${new Date().getDate()}`;
    client.standup.ensure(key, {
      day: new Date().getDate(),
      channel: message.channel.name,
      member,
      text,
    });
    client.standup.set(key, text, 'text');
    message.channel.send(`Relatório para o membro ${member} foi salvo!`);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Developer',
};

exports.help = {
  name: 'standup',
  category: 'Diversos',
  description: 'Emite um relatório para os outros membros.',
  usage: 'standup [report text]',
};
