const axios = require('axios');
const cheerio = require('cheerio');

class OlharDigital {
    constructor() {
        this.url = 'https://olhardigital.com.br/';
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
                    const mainPage = $('.card-post.type1.img-effect1').first();
                    const latestNews = $(mainPage).find('.attachment-last-home.size-last-home').first();
                    latestNewsTitle = $(mainPage).attr('title');
                    latestNewsLink = $(mainPage).attr('href');
                    latestNewsImage = $(latestNews).attr('src').replace('-210x172', '');
    
                    axios(latestNewsLink).then(response => {
                        const html = response.data;
                        const $ = cheerio.load(html);
                        const topicsList = $('#singleMain > div > div > a');
                        var topics = '';
                        $(topicsList).each(function() {
                            topics += '#'+$(this).text().replace(/\s/g, '')+' ';
                        });
    
                        var latestNewsInfo =
                        {
                            title: latestNewsTitle,
                            subtitle: '',
                            link: latestNewsLink,
                            imageUrl: latestNewsImage,
                            topics: topics
                        };
                        resolve(latestNewsInfo);
                    }).catch(console.error);
                }).catch(console.error);
            } catch (error) {
                console.log(error);
            }
        });
    }
}

module.exports = { OlharDigital };