const CronJob = require('cron').CronJob;
const fs = require('fs');
const axios = require('axios');
const { tweetNews } = require('./src/scripts/twitter.js');
const { postNews } = require('./src/scripts/telegram.js');
const { sendWebhook } = require('./src/scripts/discord.js');
const { Tecmundo } = require('./src/scripts/tecmundo.js');
const { OlharDigital } = require('./src/scripts/olhardigital.js');
const { CnnBrasil } = require('./src/scripts/cnn.js');
const { G1 } = require('./src/scripts/g1.js');
const { Veja } = require('./src/scripts/veja.js');

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function downloadImage(imageUrl) {
    return new Promise(resolve =>{
        try {
            console.log(Date() + '- Downloading image...');    
            axios({
                method: "GET",
                url: imageUrl,
                responseType: "stream",   
            }).then(response => {
                const image = fs.createWriteStream('./public/images/image.jpg');
                response.data.pipe(image);
                image.on('finish', () => {
                    console.log(Date() + '- Image downloaded'); 
                    image.close();
                    resolve(true);
                });
            });
        } catch(err) {
            console.log(err);
        }
    });
}

function getRandomWebsite () {
    return new Promise(resolve => {
        try {
            const websites = [Tecmundo, CnnBrasil, Veja, G1, OlharDigital];
            const randomWebsite = websites[getRandomInt(websites.length)];
            resolve(new randomWebsite());
        } catch(err) {
            console.log(err);
        }
    });
}

function checkIfIsPosted(title) {
    return new Promise(resolve => {
        var exists = true;
        try {
            const Post = require('./src/db/model/post');
            Post.findAll({
                where: {
                    title: title
                }
            }).then(posts => {
                exists = posts.length > 0;
                resolve(exists);
            });
        } catch(err) {
            console.log(err);
        }
    });
}

const doWork = async () => {
    try {
        const Post = require('./src/db/model/post');
        website = await getRandomWebsite();
        const latestNewsInfo = await website.getLatestNews();
        if (latestNewsInfo.imageUrl == undefined || latestNewsInfo.title == '' || latestNewsInfo.link == '') {
            return;
        }

        const exists = await checkIfIsPosted(latestNewsInfo.title);

        if (!exists) {     
            console.log(Date() + '- Posting news...');
            const downloadImageResult = await downloadImage(latestNewsInfo.imageUrl);
            if (downloadImageResult) {
                const image = fs.readFileSync('./public/images/image.jpg');
                if (image.byteLength >= 5242880) {
                    console.log(Date() + '- Image is too big');
                    await Post.create({
                        website_url: latestNewsInfo.link,
                        title: latestNewsInfo.title
                    });
                    return;
                }

                await tweetNews(latestNewsInfo);
                await postNews(latestNewsInfo);
                await sendWebhook(latestNewsInfo);
                await Post.create({
                    website_url: latestNewsInfo.link,
                    title: latestNewsInfo.title
                });
                console.log(Date() + '- News posted');
            }
        } else {
            console.log(Date() + '- News already posted');
        }
    } catch(err) {
        console.log(err);
    }
} 

(async () => {
    const database = require('./src/db/db');
    const Post = require('./src/db/model/post');
 
    try {
        console.log(Date() + '- Connecting to database...');
        const result = await database.sync();
        console.log(Date() + '- Database connected');
    } catch (error) {
        console.log(error);
    }
})();

console.log(Date() + '- Starting cron job...');
var job = new CronJob('0 * * * *', function() {
    doWork();
});

job.start();