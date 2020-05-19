exports.run = async (client, message, args) => {
  if (!args || args.length > 1) {
    return message.reply('Isso é tudo sua culpa! Muitos parâmetros!');
  }

  const data = await retrieveData(args.length > 0 ? args[0] : null).catch(
    (reason) => {
      if (reason && reason.message) return message.reply(`Estamos condenados! ${reason.message}`);
      return message.reply("'Estou completamente fora de mim.'.");
    },
  );

  await message.channel.send({
    embed: {
      color: 0x0099ff,
      title: 'Corona Data',
      url: 'https://github.com/NovelCOVID/API',
      description: 'NovelCOVID API',
      fields: [
        {
          name: args.length > 0 ? data.country : 'All Countries',
          value: `Casos: ${data.cases}\nMortes: ${data.deaths}\nRecuperados: ${data.recovered}`,
        },
      ],
      thumbnail: {
        url:
          args.length > 0
            ? data.countryInfo.flag
            : 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/globe-with-meridians_1f310.png',
        height: 84,
        width: 84,
      },
      timestamp: new Date(),
      footer: {
        text: message.author.username,
        // eslint-disable-next-line camelcase
        icon_url: message.author.avatarURL,
      },
    },
  });

  function retrieveData(country) {
    return new Promise((resolve, reject) => {
      const request = require('request');
      const options = {
        method: 'GET',
        url: `https://corona.lmao.ninja/v2/${
          country ? `countries/${country}` : 'all'
        }`,
      };
      request(options, (error, response, body) => {
        if (error || response.statusCode !== 200) {
          reject(
            new Error(`A API retornou um erro: \n${JSON.stringify(error)}`),
          );
        }

        resolve(JSON.parse(body));
      });
    });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User',
};

exports.help = {
  name: 'corona',
  category: 'Corona',
  description: 'Informa o número de casos do corona virus e o número de mortos - Dados recolhidos no NovelCOVID API.',
  usage: `corona [país] - Exibe o total de casos de mortes do páis especificado.
  corona - Exibe o total de casos e mortes no mundo.
  `,
};
