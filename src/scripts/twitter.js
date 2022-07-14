const { TwitterApi, EUploadMimeType } = require('twitter-api-v2');

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
    return new Promise((resolve, reject) => {
        try {
            console.log(Date() + '- Uploading image...'); 
            client.v1.uploadMedia('./public/images/image.jpg', { mimeType: EUploadMimeType.Png }).then(response => {
                console.log(Date() + '- Image Uploaded'); 
                console.log(Date() + '- Tweeting...');  
                var tweetMessage = `${latestNewsInfo.title}\n\nLeia mais: ${latestNewsInfo.link}\n\n#bolhadev`;
                console.log(tweetMessage.length);
                if (tweetMessage.length < 280) {
                    rwClient.v1.tweet(tweetMessage, { media_ids: response}).then(response => {
                        resolve(response);
                    }).catch(console.error); 
                } else {
                    rwClient.v1.tweet(`${latestNewsInfo.title}\n\n#bolhadev`, { media_ids: response}).then(response => {
                        rwClient.v1.tweet(`Leia mais: ${latestNewsInfo.link}`, { in_reply_to_status_id: response.id_str }).then(response => {
                            resolve(response);
                        });
                    }).catch(console.error); 
                }
                
            }).catch(console.error);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

module.exports = { tweetNews };