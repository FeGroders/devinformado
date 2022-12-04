const axios = require('axios');

require('dotenv').config()
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_BOT_CHAT_ID = process.env.TELEGRAM_BOT_CHAT_ID;

function postNews(latestNewsInfo) {
    return new Promise((resolve, reject) => {
        try {
            console.log(Date() + '- Sendind message in Telegram...');
            axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, {
                chat_id: TELEGRAM_BOT_CHAT_ID,
                photo: latestNewsInfo.imageUrl,
                caption: `${latestNewsInfo.title}`+(latestNewsInfo.subtitle != undefined ? `\n\n${latestNewsInfo.subtitle}` : ''),
                parse_mode: 'Markdown',
                disable_web_page_preview: true,
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Leia mais', url: latestNewsInfo.link }]
                    ]
                }
            }).then(response => {
                console.log(Date() + '- Telegram message sent');
                resolve(response);
            }).catch(console.error);
        } catch (error) {
            console.log(error);
            reject(error);
        }    
    });
}

module.exports = { postNews };