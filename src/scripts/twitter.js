const { TwitterApi, EUploadMimeType } = require('twitter-api-v2');
const axios = require('axios');
const fs = require('fs');

require('dotenv').config()
const TWITTER_API_KEY = process.env.TWITTER_API_KEY;
const TWITTER_API_KEY_SECRET = process.env.TWITTER_API_KEY_SECRET;
const TWITTER_ACCESS_TOKEN = process.env.TWITTER_ACCESS_TOKEN;
const TWITTER_ACCESS_TOKEN_SECRET = process.env.TWITTER_ACCESS_TOKEN_SECRET;

const client = new TwitterApi({
    accessToken: TWITTER_ACCESS_TOKEN,
    accessSecret: TWITTER_ACCESS_TOKEN_SECRET,
    appKey: TWITTER_API_KEY,
    appSecret: TWITTER_API_KEY_SECRET,
});

const rwClient = client.readWrite;

const tweetNews = async (latestNewsInfo) => {
    try {
        console.log(Date() + '- Uploading image...');  
        client.v1.uploadMedia('./public/images/image.jpg', { mimeType: EUploadMimeType.Png }).then(response => {
            console.log(Date() + '- Image Uploaded'); 
            console.log(Date() + '- Tweeting...');  
            rwClient.v1.tweet(`${latestNewsInfo.title}`, { media_ids: response}).then(response => {
                //TODO: save tweet info in database

                console.log(Date() + '- Tweeted'); 
                console.log(Date() + '- Replying with the url');
                client.v1.reply(`Leia mais: ${latestNewsInfo.link}`, response.id_str).then(response => {
                    console.log(Date() + '- Replied'); 
                }).catch(console.error);
            }).catch(console.error); 
        }).catch(console.error);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { tweetNews };