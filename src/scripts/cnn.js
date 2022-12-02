const axios = require('axios');
const cheerio = require('cheerio');

class CnnBrasil {
    constructor() {
        this.url = 'https://www.cnnbrasil.com.br/tecnologia/';
    }

    getLatestNews(){
        return new Promise(resolve =>{
            try {
                var latestNewsTitle;
                var latestNewsLink;
                var latestNewsImage;

                axios(this.url).then(response => {
                    const html = response.data;
                    const $ = cheerio.load(html);
                    const latestNews = $('.home__post').first();
                    latestNewsTitle = $(latestNews).find('.home__title').text();
                    latestNewsLink = $(latestNews).attr('href');
                    latestNewsImage = $(latestNews).find('img').attr('src');

                    axios(latestNewsLink).then(response => {
                        const html = response.data;
                        const $ = cheerio.load(html);
                        const topicsList = $('body > div.site__content > div > div > main > article > div > div.tags__topics > ul > li')
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

module.exports = { CnnBrasil };