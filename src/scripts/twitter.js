// const axios = require('axios');
const { TwitterApi, EUploadMimeType } = require('twitter-api-v2');
const axios = require('axios');
const fs = require('fs');

require('dotenv').config()
const API_KEY = process.env.API_KEY;
const API_KEY_SECRET = process.env.API_KEY_SECRET;
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
        console.log(Date() + '- Uploading image...');  
        await uploadImage(latestNewsInfo.imageUrl).then(response => {
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

function uploadImage(imageUrl) {
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
                    image.close();
                    resolve(client.v1.uploadMedia('./public/images/image.jpg', { mimeType: EUploadMimeType.Png }));
                    //delete image
                    fs.unlink('./public/images/image.jpg', (err) => {
                        if (err) throw err;
                        console.log(Date() + '- Image Deleted'); 
                    }
                    );
                }
                );
            }
            ).catch(console.error);
        } catch (err) {
        console.log(err);
        }
    }
    );
}

module.exports = { tweetNews };