const { job } = require('cron');
const CronJob = require('cron').CronJob;
const fs = require('fs');
const axios = require('axios');
const { tweetNews } = require('./src/scripts/twitter.js');
const { postNews } = require('./src/scripts/telegram.js');
const { Tecmundo } = require('./src/scripts/tecmundo.js');
const { OlharDigital } = require('./src/scripts/olhardigital.js');
const { CnnBrasil } = require('./src/scripts/cnn.js');
const { G1 } = require('./src/scripts/g1.js');
const { Veja } = require('./src/scripts/veja.js');
var website = null;

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

(async () => {
    const database = require('./src/db/db');
 
    try {
        const resultado = await database.sync();
        // console.log(resultado);
    } catch (error) {
        console.log(error);
    }
})();

const doWork = async () => {
    switch(getRandomInt(3)) {
        case 0: 
         console.log(Date() + '- Tecmundo');
            website = new Tecmundo()
            break;
        case 1:
            console.log(Date() + '- Veja'); //ok
            website = new Veja()
            break;
        case 2:
            console.log(Date() + '- CnnBrasil'); //ok
            website = new CnnBrasil()
            break;
        // case 3: 
        //     console.log(Date() + '- G1');
        //     website = new G1()
        //     break;
        // case 4:
        //     console.log(Date() + '- OlharDigital');
        //     website = new OlharDigital()
        //     break;
    }

    if (website) {
        website.getLatestNews().then(response => {
            var latestNewsInfo = response;
            const Post = require('./src/db/model/post');

            const posts = Post.findAll().then(posts => {
                console.log(Date() + '- Checking if news already exists...');
                var exists = false;
                for (var i = 0; i < posts.length; i++) {
                    if (posts[i].title == latestNewsInfo.title) {
                        exists = true;
                        break;
                    }
                }
                if (!exists) {
                    console.log(Date() + '- News does not exist...');
                    downloadImage(response.imageUrl).then(response => {
                        tweetNews(latestNewsInfo);
                        postNews(latestNewsInfo);

                        // const resultadoCreate = await Post.create({
                        //     nome: 'mouse',
                        //     preco: 10,
                        //     descricao: 'Um mouse USB bonitão'
                        // })
                        // console.log(resultadoCreate);
                        const resultadoCreate = await Post.create({
                            // twitter_id: latestNewsInfo.twitterId,
                            // website_url: latestNewsInfo.websiteUrl,
                            // title: latestNewsInfo.title,
                            // image_url: latestNewsInfo.imageUrl
                            twitter_id: 'latestNewsInfo.twitterId',
                            website_url: latestNewsInfo.websiteUrl,
                            title: latestNewsInfo.title,
                            image_url: latestNewsInfo.imageUrl
                        }).then(response => {
                            console.log(Date() + '- News created');
                        }).catch(error => {
                            console.log(error);
                        });
                    });
                }
            });
        });
    }
} 

doWork();

// const jog = new CronJob('* 5 * * * *', () => {
//     console.log('running a task every 5 minutes');
//     doWork();
// });

// job.start();