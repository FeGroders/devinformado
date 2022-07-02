// const axios = require('axios');
const { TwitterApi } = require('twitter-api-v2');

require('dotenv').config()
const API_KEY = process.env.API_KEY;
const API_KEY_SECRET = process.env.API_KEY_SECRET;
const BEARER_TOKEN = process.env.BEARER_TOKEN;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const client = new TwitterApi({
    accessToken: ACCESS_TOKEN,
    accessSecret: ACCESS_TOKEN_SECRET,
    appKey: API_KEY,
    appSecret: API_KEY_SECRET,
});

const rwClient = client.readWrite;

const tweetNews = async (latestNewsInfo) => {
    try {
        await rwClient.v1.tweet('My tweet text with two images!');
    } catch (error) {
        console.log(error);
    }
}



// function uploadImage(image) {
//     const formData = new FormData();

//     //upload twitter image
//     formData.append('media', image);
//     formData.append('media_category', 'tweet_image');
//     formData.append('add_media_to_status', '1');

//     return axios.post('https://upload.twitter.com/1.1/media/upload.json', formData, {
//         headers: {
//             'Authorization': `Bearer ${BEARER_TOKEN}`,
//             'Content-Type': 'multipart/form-data'
//         }
//     }).then(response => {
//         console.log(response.data);
//     }
//     ).catch(console.error);

            

// }

// function tweetNews(newsInfo) {
//     uploadImage(newsInfo.image).then(response => {
//         const mediaId = response.data.media_id_string;
//         const tweet = `${newsInfo.title} ${newsInfo.link}`;
//         const tweetData = {
//             status: tweet,
//             media_ids: mediaId
//         };
//         return axios.post('https://api.twitter.com/1.1/statuses/update.json', tweetData, {
//             headers: {
//                 'Authorization': `Bearer ${BEARER_TOKEN}`,
//                 'Content-Type': 'application/json'
//             }
//         }).then(response => {
//             console.log(response.data);
//         }
//         ).catch(console.error);
//     }
//     ).catch(console.error);
// }

module.exports = { tweetNews };