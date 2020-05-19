exports.run = async (client, message) => {
  await message.channel.send('As recomendações de prevenção à COVID-19 são as seguintes:\n• Lave com frequência as mãos até a altura dos punhos, com água e sabão, ou então higienize com álcool em gel 70%.\n• Ao tossir ou espirrar, cubra nariz e boca com lenço ou com o braço, e não com as mãos.\n• Evite tocar olhos, nariz e boca com as mãos não lavadas.\n• Ao tocar, lave sempre as mãos como já indicado.\n• Mantenha uma distância mínima de cerca de 2 metros de qualquer pessoa tossindo ou espirrando.\n• Evite abraços, beijos e apertos de mãos. Adote um comportamento amigável sem contato físico, mas sempre com um sorriso no rosto.\n• Higienize com frequência o celular e os brinquedos das crianças.\n• Não compartilhe objetos de uso pessoal, como talheres, toalhas, pratos e copos.\n• Mantenha os ambientes limpos e bem ventilados.\n• Evite circulação desnecessária nas ruas, estádios, teatros, shoppings, shows, cinemas e igrejas. Se puder, fique em casa.\n• Se estiver doente, evite contato físico com outras pessoas, principalmente idosos e doentes crônicos, e fique em casa até melhorar.\n• Durma bem e tenha uma alimentação saudável.\n• Utilize máscaras caseiras ou artesanais feitas de tecido em situações de saída de sua residência.\n\nPara mais informações visite o site do ministério da saúde: https://coronavirus.saude.gov.br/');
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User',
};

exports.help = {
  name: 'prevencao',
  category: 'Corona',
  description: 'Exibe as precauções a serem tomadas com o corona virus',
  usage: 'prevencao',
};
