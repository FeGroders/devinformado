const axios = require('axios');
require('dotenv').config()
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

function sendWebhook(latestNewsInfo) {
    return new Promise((resolve, reject) => {
        try {
            console.log(Date() + '- Sendind webhook in Discord...');
            axios.post(DISCORD_WEBHOOK_URL, {
                embeds: [{
                    title: latestNewsInfo.title,
                    url: latestNewsInfo.link,
                    image: {
                        url: latestNewsInfo.imageUrl
                    },
                }],                
            }).then(response => {
                console.log(Date() + '- Discord webhook sent');
                resolve(response);
            }).catch(console.error);
        } catch (error) {
            console.log(error);
            reject(error);
        }    
    });
}

module.exports = { sendWebhook };