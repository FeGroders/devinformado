const axios = require('axios');
const cheerio = require('cheerio');

function getLatestNews(){
    return new Promise(resolve =>{
        try {
            var url = 'https://olhardigital.com.br/';
            axios(url).then(response => {
                const html = response.data;
                const $ = cheerio.load(html);
                const latestNews = $('#body > main > section:nth-child(3) > div.post-list.columns2.margin-wrapper-lg > a:nth-child(1)').first();
                const latestNewsTitle = $(latestNews).attr('title');
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

module.exports = { getLatestNews };