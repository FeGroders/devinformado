const axios = require('axios');
const cheerio = require('cheerio');

class OlharDigital {
    constructor() {
        this.url = 'https://olhardigital.com.br/';
    }

    getLatestNews(){
        return new Promise(resolve =>{
            try {
                axios(this.url).then(response => {
                    const html = response.data;
                    const $ = cheerio.load(html);
                    const mainPage = $('.card-post.type1.img-effect1').first();
                    const latestNews = $(mainPage).find('.attachment-last-home.size-last-home.wp-post-image').first();
                    const latestNewsTitle = $(mainPage).attr('title');
                    const latestNewsLink = $(mainPage).attr('href');
                    const latestNewsImage = $(latestNews).attr('src').replace('-210x172', '');
    
                    var latestNewsInfo =
                    {
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

module.exports = { OlharDigital };