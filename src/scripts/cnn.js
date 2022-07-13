const axios = require('axios');
const cheerio = require('cheerio');

class CnnBrasil {
    constructor() {
        this.url = 'https://www.cnnbrasil.com.br/tecnologia/';
    }

    getLatestNews(){
        return new Promise(resolve =>{
            try {
                axios(this.url).then(response => {
                    const html = response.data;
                    const $ = cheerio.load(html);
                    const latestNews = $('.home__post').first();
                    const latestNewsTitle = $(latestNews).find('.home__title').text();
                    const latestNewsLink = $(latestNews).attr('href');
                    const latestNewsImage = $(latestNews).find('img').attr('src');
    
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

module.exports = { CnnBrasil };