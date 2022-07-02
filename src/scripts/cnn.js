const axios = require('axios');
const cheerio = require('cheerio');
const { resolve } = require('path');

const getLatestNews = async () => {
    try {
        var url = 'https://www.cnnbrasil.com.br/tecnologia/';
        axios(url).then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            const latestNews = $('.home__post');
            const latestNewsTitle = $(latestNews).find('.home__title').text();
            const latestNewsLink = $(latestNews).attr('href');
            const latestNewsImage = $(latestNews).find('home__title__thumb home__title__thumb--xl').attr('src');
            const latestNewsAltImage = $(latestNews).find('home__title__thumb home__title__thumb--xl').attr('alt');

            var latestNewsInfo =
            {
                latestNewsTitle,
                latestNewsLink,
                latestNewsImage,
                latestNewsAltImage
            };
            console.log(latestNewsInfo);
            resolve(latestNewsInfo);


        }).catch(console.error);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getLatestNews };