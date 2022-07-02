const axios = require('axios');
require('dotenv').config()
const APIKEY = process.env.APIKEY;
const API_KEY_SECRET = process.env.API_KEY_SECRET;
const BEARER_TOKEN = process.env.BEARER_TOKEN;

function uploadImage(image) {
    const formData = new FormData();

    //upload twitter image
    formData.append('media', image);
    formData.append('media_category', 'tweet_image');
    formData.append('add_media_to_status', '1');

    return axios.post('https://upload.twitter.com/1.1/media/upload.json', formData, {
        headers: {
            'Authorization': `Bearer ${BEARER_TOKEN}`,
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => {
        console.log(response.data);
    }
    ).catch(console.error);

            

}

function tweetNews(newsInfo) {
    uploadImage(newsInfo.image).then(response => {
        const mediaId = response.data.media_id_string;
        const tweet = `${newsInfo.title} ${newsInfo.link}`;
        const tweetData = {
            status: tweet,
            media_ids: mediaId
        };
        return axios.post('https://api.twitter.com/1.1/statuses/update.json', tweetData, {
            headers: {
                'Authorization': `Bearer ${BEARER_TOKEN}`,
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log(response.data);
        }
        ).catch(console.error);
    }
    ).catch(console.error);
}

module.exports = { tweetNews };