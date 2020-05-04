exports.run = async (client, message) => {
  await message.channel.send(`Os sintomas da COVID-19 podem variar de um simples resfriado até uma pneumonia severa. Sendo os sintomas mais comuns:
• Tosse;
• Febre;
• Coriza;
• Dor de garganta;
• Dificuldade para respirar;

Para mais informações visite o site do ministério da saúde: https://coronavirus.saude.gov.br/`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User',
};

exports.help = {
  name: 'sintomas',
  category: 'Miscelaneous',
  description: 'Exibe as precauções a serem tomadas com o corona virus',
  usage: '',
};
