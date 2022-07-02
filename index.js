const { getLatestNews } = require('./src/scripts/cnn.js');
const { tweetNews } = require('./src/scripts/twitter.js');

var latestNewsInfo = getLatestNews();
// tweetNews(latestNewsInfo);