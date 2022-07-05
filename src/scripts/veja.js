const axios = require('axios');
const cheerio = require('cheerio');

class Veja {
    constructor() {
        this.url = 'https://veja.abril.com.br/tecnologia/';
    }

    getLatestNews(){
        return new Promise(resolve =>{
            try {
                axios(this.url).then(response => {
                    const html = response.data;
                    const $ = cheerio.load(html);
                    const latestNews = $('.card.not-loaded.list-item').first();
                    const latestNewsTitle = $(latestNews).find('h2.title').text() + '\n' + $(latestNews).find('span.description').text().replace(/\t/g, '');
                    const latestNewsLink = $(latestNews).find('a').attr('href');
                    const latestNewsImage = $(latestNews).find('img').attr('src').split('?')[0];

                    var latestNewsInfo =
                    {
                        title: latestNewsTitle,
                        link: latestNewsLink,
                        imageUrl: latestNewsImage,
                    };
                    console.log(latestNewsInfo);
                    resolve(latestNewsInfo);
                }).catch(console.error);
            } catch (error) {
                console.log(error);
            }
        });
    }
}

module.exports = { Veja };