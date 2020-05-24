exports.run = async (client, message, args) => {
    if (!args || args.length != 2) {
      return message.reply('Isso é tudo sua culpa! quantidade de parametros errada!');
    }
    if (args[1]>10){
        return message.reply('Ta maluco! eu ficaria o dia inteiro pra processar isso!');
    }
    var mensagem = '';
    for (let index = 0; index < args[1]; index++) {
        var today = new Date();
        today.setDate(today.getDate()-3-index)
        day = today.getFullYear() + "-" + (string(today.getMonth() + 1).padStart(2, '0')) + "-" + today.getDate();
        
        const data = await retrieveData(
            args.length > 0 ? args[0] : null,
            day,
        ).catch((reason) => {
            if (reason && reason.message) return message.reply(`Estamos condenados! ${reason.message}`);
            return message.reply('Estou completamente fora de mim.');
        });
        console.log(day)
        mensagem.concat('dia: '+day+"\n")
        mensagem.concat('Casos: '+data[0].casos!==undefined?data[0].casos:"0"+"\n")
        mensagem.concat('Mortes: '+data[0].mortes!==undefined?data[0].mortes:"0"+"\n")
    }
    
    await message.channel.send({
      embed: {
        color: 0x0099ff,
        title: 'Grafico casos '+args[0],
        url: 'https://github.com/filipefer1/covid19-api',
        description: 'Covid Api Brasil',
        fields: [
          {
            name:
              'casos no '+args[0]+"nos ultimos "+args[1],
            value: mensagem,
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
  
    function retrieveData(uf,day) {
      return new Promise((resolve, reject) => {
        const request = require('request');
        const options = {
          method: 'GET',
          url: `https://covid-api-brasil.herokuapp.com/${
            uf+'/'+day
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
    description: 'Informa o número de casos e o número de mortos pelo corona virus no Brasil e seus estados - Dados recolhidos no Covid Api Brasil.',
    usage: `coronabrasil [UF] [DIA] [MÊS] - Exibe o numero de casos e mortes em um estado no dia especificado.
    coronabrasil [UF] - Exibe o número total de casos e mortes no estado especificado.
    coronabrasil - exibe o numero total de casos e mortes no Brasil.`,
  };
  