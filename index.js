const { job } = require('cron');
const CronJob = require('cron').CronJob;
const { tweetNews } = require('./src/scripts/twitter.js');
const { Tecmundo } = require('./src/scripts/tecmundo.js');
const { OlharDigital } = require('./src/scripts/olhardigital.js');
const { CnnBrasil } = require('./src/scripts/cnn.js');
var website = null;

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

switch(getRandomInt(3)) {
    case 1: 
        website = new Tecmundo()
        break;
    case 2:
        website = new OlharDigital()
        break;
    case 3:
        website = new CnnBrasil()
        break;
}

website.getLatestNews().then(response => {
    tweetNews(response);
}).catch(console.error);

// const jog = new CronJob('* 5 * * * *', () => {
//     console.log('running a task every 5 minutes');
// });

// job.start();