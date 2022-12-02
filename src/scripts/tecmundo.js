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
                    const mainPage = $('.tec--list__item').first();
                    const latestNews = $(mainPage).find('a.tec--card__thumb__link').first();
                    const latestNewsTitle = $(mainPage).find('a.tec--card__title__link').text();
                    const latestNewsLink = $(latestNews).attr('href');
                    var latestNewsImage = $(latestNews).find('img.tec--card__thumb__image').attr('data-src');
                    if (latestNewsImage != undefined) {
                        latestNewsImage = latestNewsImage.split('?')[0];
                    }

                    var latestNewsInfo = {
                        title: latestNewsTitle,
                        link: latestNewsLink,
                        imageUrl: latestNewsImage,
                        topics: ''
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