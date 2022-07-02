const { job } = require('cron');
const { getLatestNews } = require('./src/scripts/cnn.js');
const { tweetNews } = require('./src/scripts/twitter.js');
const CronJob = require('cron').CronJob;

// var latestNewsInfo = getLatestNews().then(response => {
//     console.log(response);
//     tweetNews(response);
// }).catch(console.error);

// getLatestNews().then(response => {
//     console.log(response);
//     tweetNews(response);
// }

// getLatestNews().then(response => {
//     console.log(response);
//     tweetNews(response);
// }).catch(console.error);


tweetNews().then(response => {
    console.log(response);
}
).catch(console.error);

// tweetNews(latestNewsInfo);




// const jog = new CronJob('* 5 * * * *', () => {
//     console.log('running a task every 5 minutes');
// });

// job.start();