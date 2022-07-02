const axios = require('axios');
const cheerio = require('cheerio');

// axios(url).then(response => {
//     const html = response.data;
//     const $ = cheerio.load(html);
//     const tabelaStatus = $('.ranking-item-wrapper');
//     const tabelaJogador = [];
//     tabelaStatus.each(function(){
//         const nomeJogador = $(this).find('.jogador-nome').text();
//         const posicaoJogador = $(this).find('.jogador-posicao').text();
//         const numeroGols = $(this).find('.jogador-gols').text();
//         const timeJogador = $(this).find('.jogador-escudo > img').attr('alt');
//         tabelaJogador.push({
//             nomeJogador,
//             posicaoJogador,
//             numeroGols,
//             timeJogador
//         });
//     });
//     console.log(tabelaJogador);
// }).catch(console.error);

function getLatestNews() {
    var url = 'https://www.cnnbrasil.com.br/tecnologia/';
    axios(url).then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const latestNews = $('.home__post');
        const latestNewsTitle = $(latestNews).find('.home__title').text();
        const latestNewsLink = $(latestNews).attr('href');
        const latestNewsImage = $(latestNews).find('home__title__thumb home__title__thumb--xl').attr('src');
        const latestNewsAltImage = $(latestNews).find('home__title__thumb home__title__thumb--xl').attr('alt');

        var latestNewsInfo =
        {
            latestNewsTitle,
            latestNewsLink,
            latestNewsImage,
            latestNewsAltImage
        };
        console.log(latestNewsInfo);
        return latestNewsInfo;
    }).catch(console.error);

}

module.exports = { getLatestNews };