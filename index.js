const { job } = require('cron');
// const { getLatestNews } = require('./src/scripts/olhardigital.js');
const { getLatestNews } = require('./src/scripts/olhardigital.js');
const { tweetNews } = require('./src/scripts/twitter.js');
const CronJob = require('cron').CronJob;

getLatestNews().then(response => {
    tweetNews(response);
}).catch(console.error);

// const jog = new CronJob('* 5 * * * *', () => {
//     console.log('running a task every 5 minutes');
// });

// job.start();