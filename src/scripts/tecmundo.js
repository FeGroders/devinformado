const axios = require('axios');
const cheerio = require('cheerio');

class Tecmundo {
    constructor() {
        this.url = 'https://www.tecmundo.com.br/novidades';
    }

    getLatestNews(){
        return new Promise(resolve =>{
            try {
                var latestNewsTitle;
                var latestNewsLink;

                axios(this.url).then(response => {
                    const html = response.data;
                    const $ = cheerio.load(html);
                    const mainPage = $('.tec--list__item').first();
                    const latestNews = $(mainPage).find('.tec--card__thumb__link').first();
                    latestNewsTitle = $(mainPage).find('.tec--card__title__link').text();
                    latestNewsLink = $(latestNews).attr('href');
                    var latestNewsImage = $(latestNews).find('img.tec--card__thumb__image').attr('data-src');
                    if (latestNewsImage != undefined) {
                        latestNewsImage = latestNewsImage.split('?')[0];
                    }
                    axios(latestNewsLink).then(response => {
                        const html = response.data;
                        const $ = cheerio.load(html);
                        const topicsList = $('#js-categories > a'); 
                        var topics = '';
                        $(topicsList).each(function() {
                            topics += '#'+$(this).text().replace(/\s/g, '')+' ';
                        });
    
                        var latestNewsInfo =
                        {
                            title: latestNewsTitle,
                            link: latestNewsLink,
                            imageUrl: latestNewsImage,
                            topics: topics
                        };
                        console.log(latestNewsInfo);
                        resolve(latestNewsInfo);
                    }).catch(console.error);
                }).catch(console.error);
            } catch (error) {
                console.log(error);
            }
        });
    }
}

module.exports = { Tecmundo };