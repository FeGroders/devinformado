const axios = require('axios');
const cheerio = require('cheerio');

class G1 {
    constructor() {
        this.url = 'https://g1.globo.com/tecnologia/';
    }

    getLatestNews(){
        return new Promise(resolve =>{
            try {
                var latestNewsTitle;
                var latestNewsSubtitle;
                var latestNewsLink;
                var latestNewsImage;
                axios(this.url).then(response => {
                    const html = response.data;
                    const $ = cheerio.load(html);
                    const latestNews = $('.bastian-feed-item').first();
                    latestNewsTitle = $(latestNews).find('.feed-post-link.gui-color-primary.gui-color-hover').text();
                    latestNewsSubtitle = $(latestNews).find('.feed-post-body-resumo').text()
                    latestNewsLink = $(latestNews).find('.feed-post-link.gui-color-primary.gui-color-hover').attr('href');
                    latestNewsImage = $('img.bstn-fd-picture-image').attr('src');

                    axios(latestNewsLink).then(response => {
                        const html = response.data;
                        const $ = cheerio.load(html);
                        const topicsList = $('body > div.glb-grid > main > div.mc-article-body > div.mc-column.entities > ul > li');
                        var topics = '';
                        $(topicsList).each(function() {
                            topics += '#'+$(this).text().replace(/\s/g, '')+' ';
                        });
    
                        var latestNewsInfo =
                        {
                            title: latestNewsTitle,
                            subTitle: latestNewsSubtitle,
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

module.exports = { G1 };