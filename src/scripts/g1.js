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
                    const latestNews = $('#eccd49a5961f68d696e46136a9d6e03a > div > div.feed-post-body-title.gui-color-primary.gui-color-hover > div > a').first();
                    const latestNewsTitle = $(latestNews).text() + '\n\n' + $('#eccd49a5961f68d696e46136a9d6e03a > div > div.feed-post-body-resumo').text();
                    const latestNewsLink = $(latestNews).attr('href');
                    const latestNewsImage = $('#eccd49a5961f68d696e46136a9d6e03a > div > div.feed-media-wrapper > a > div > picture > img').attr('src');

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