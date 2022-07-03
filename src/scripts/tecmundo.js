const axios = require('axios');
const cheerio = require('cheerio');

class Tecmundo {
    constructor() {
        this.url = 'https://www.tecmundo.com.br/novidades';
    }

    getLatestNews(){
        return new Promise(resolve =>{
            try {
                axios(this.url).then(response => {
                    const html = response.data;
                    const $ = cheerio.load(html);
                    const mainPage = $('main.tec--main').first();
                    const latestNews = $(mainPage).find('.tec--card__thumb__link').first();
                    const latestNewsTitle = $(latestNews).attr('title');
                    const latestNewsLink = $(latestNews).attr('href');
                    const latestNewsImage = $(latestNews).find('img.tec--card__thumb__image').attr('data-src').split('?')[0];

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

module.exports = { Tecmundo };