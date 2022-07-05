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

const doWork = async () => {
    switch(getRandomInt(3)) {
        case 1: 
         console.log(Date() + '- Tecmundo');
            website = new Tecmundo()
            break;
        case 2:
            console.log(Date() + '- Veja'); //ok
            website = new Veja()
            break;
        case 3:
            console.log(Date() + '- CnnBrasil'); //ok
            website = new CnnBrasil()
            break;
        // case 4: 
        //     console.log(Date() + '- G1');
        //     website = new G1()
        //     break;
        // case 5:
        //     console.log(Date() + '- OlharDigital');
        //     website = new OlharDigital()
        //     break;
    }

    website = new Tecmundo()

    website.getLatestNews().then(response => {
        var latestNewsInfo = response;
        downloadImage(response.imageUrl).then(response => {
            tweetNews(latestNewsInfo);
            postNews(latestNewsInfo);
        });
    });
} 

doWork();

// const jog = new CronJob('* 5 * * * *', () => {
//     console.log('running a task every 5 minutes');
// });

// job.start();