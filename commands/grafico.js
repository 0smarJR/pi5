exports.run = async (client, message, args) => {
  if (!args || args.length !== 2) {
    return message.reply('Isso é tudo sua culpa! quantidade de parametros errada!');
  }
  if (args[1] > 10) {
    return message.reply('Ta maluco! eu ficaria o dia inteiro pra processar isso!');
  }
  let mensagem = 'Casos por dia';
  for (let index = 0; index < args[1]; index++) {
    const today = new Date();
    today.setDate(today.getDate() - 1 - index);
    const day = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    const data = await retrieveData(
      args.length > 0 ? args[0] : null,
      day,
    ).catch((reason) => {
      if (reason && reason.message) return message.reply(`Estamos condenados! ${reason.message}`);
      return message.reply('Estou completamente fora de mim.');
    });
    mensagem = `${mensagem}\nDia: ${day}`;
    mensagem = `${mensagem}\n-> Casos: ${data[0].casos !== undefined ? data[0].casos : '0'}`;
    mensagem = `${mensagem}\n-> Mortes: ${data[0].mortes !== undefined ? data[0].mortes : '0'}`;
  }

  await message.channel.send({
    embed: {
      color: 0x0099ff,
      title: `Grafico casos ${args[0]}`,
      url: 'https://github.com/filipefer1/covid19-api',
      description: 'Covid Api Brasil',
      fields: [
        {
          name: `casos e mortes - ${args[0]} - nos ultimos ${args[1]} dias:`,
          value: `${mensagem}`,
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

  function retrieveData(uf, day) {
    return new Promise((resolve, reject) => {
      const request = require('request');
      const options = {
        method: 'GET',
        url: `https://covid-api-brasil.herokuapp.com/${
          `${uf==="br"?"casos":uf}/${day}`
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
  name: 'grafico',
  category: 'Corona',
  description: 'Exibe um gráfico mostrando o número de casos e o número de mortos pelo corona virus no Brasil e seus estados nos ultimos dias - Dados recolhidos no Covid Api Brasil.',
  usage: 'grafico [UF] [DIAS] - O grafico será gerado mostrando o numero de casos e mortes do estado escolhido nos ultimos "X" dias (sendo "X" a variável [DIAS] e seu limite sendo 10).',
};
