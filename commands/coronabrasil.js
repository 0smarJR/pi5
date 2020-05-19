exports.run = async (client, message, args) => {
  if (!args || args.length > 3) {
    return message.reply('this is all your fault: too many parameters!');
  }

  const data = await retrieveData(
    args.length > 0 ? args[0] : null,
    args.length > 1 ? args[1] : null,
    args.length > 2 ? args[2] : null,
  ).catch((reason) => {
    if (reason && reason.message) return message.reply(`we're doomed! ${reason.message}`);
    return message.reply("I'm quite beside myself.");
  });

  await message.channel.send({
    embed: {
      color: 0x0099ff,
      title: 'Corona Data Brasil',
      url: 'https://github.com/filipefer1/covid19-api',
      description: 'Covid Api Brasil',
      fields: [
        {
          name:
            args.length > 0
              ? args[0]
                ? `${args[0].toUpperCase()} - ${args[1] ? args[1] : new Date().getDate()}/${args[2] ? args[2] : new Date().getMonth() + 1}/2020`
                : args[0]
              : 'Brasil',
          value: `Casos: ${
            args[0]
              ? args[1] !== undefined
                ? data[0].casos
                : data.casos
              : data.totalCasos
          }\nMortes: ${
            args[0]
              ? args[1] !== undefined
                ? data[0].mortes
                : (data.mortes === undefined ? '0':data.mortes)
              : data.totalMortes
          }`,
        },
      ],
      thumbnail: {
        url:
          'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/237/flag-for-brazil_1f1e7-1f1f7.png',
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

  function retrieveData(uf, dia, mes) {
    return new Promise((resolve, reject) => {
      const request = require('request');
      const options = {
        method: 'GET',
        url: `https://covid-api-brasil.herokuapp.com/${
          uf ? uf + (dia && mes ? `/2020-${mes}-${dia}` : '') : 'casos'
        }`,
      };
      request(options, (error, response, body) => {
        if (error || response.statusCode !== 200) {
          reject(
            new Error(`An error was sent by API: \n${JSON.stringify(error)}`),
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
  name: 'coronabrasil',
  category: 'Corona',
  description: 'Corona data from Covid Api Brasil.',
  usage: 'coronabrasil [UF] [DIA] [MÊS]',
};
