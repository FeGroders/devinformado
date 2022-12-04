const axios = require('axios');
const cheerio = require('cheerio');

class Veja {
    constructor() {
        this.url = 'https://veja.abril.com.br/tecnologia/';
    }

    getLatestNews(){
        return new Promise(resolve =>{
            try {
                var latestNewsTitle;
                var latestNewsSubTitle;
                var latestNewsLink;
                var latestNewsImage;

                axios(this.url).then(response => {
                    const html = response.data;
                    const $ = cheerio.load(html);
                    const latestNews = $('.card.not-loaded.list-item').first();
                    latestNewsTitle = $(latestNews).find('h2.title').text();
                    latestNewsSubTitle = $(latestNews).find('span.description').text().replace(/\t/g, '');
                    latestNewsLink = $(latestNews).find('a').attr('href');
                    latestNewsImage = $(latestNews).find('img').attr('src').split('?')[0];

                    axios(latestNewsLink).then(response => {
                        const html = response.data;
                        const $ = cheerio.load(html);
                        const topicsList = $('.article.post > section > ul.article-tags.tags > li')
                        var topics = '';
                        $(topicsList).each(function() {
                            topics += '#'+$(this).text().replace(/\s/g, '')+' ';
                        });

                        var latestNewsInfo =
                        {
                            title: latestNewsTitle,
                            subtitle: latestNewsSubTitle,
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

module.exports = { Veja };