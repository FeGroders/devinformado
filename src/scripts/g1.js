const axios = require('axios');
const cheerio = require('cheerio');

class G1 {
    constructor() {
        this.url = 'https://g1.globo.com/tecnologia/';
    }

    getLatestNews(){
        return new Promise(resolve =>{
            try {
                axios(this.url).then(response => {
                    const html = response.data;
                    const $ = cheerio.load(html);
                    const latestNews = $('.bastian-feed-item').first();
                    const latestNewsTitle = $(latestNews).find('.feed-post-link.gui-color-primary.gui-color-hover').text() + '\n\n' + $(latestNews).find('.feed-post-body-resumo').text();
                    const latestNewsLink = $(latestNews).find('.feed-post-link.gui-color-primary.gui-color-hover').attr('href');
                    const latestNewsImage = $('img.bstn-fd-picture-image').attr('src');

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

module.exports = { G1 };