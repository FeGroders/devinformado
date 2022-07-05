const axios = require('axios');
const fs = require('fs');

require('dotenv').config()
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_BOT_CHAT_ID = process.env.TELEGRAM_BOT_CHAT_ID;

const postNews = async (latestNewsInfo) => {
    try {
        console.log(Date() + '- Sendind message in Telegram...');
        // axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        //     chat_id: TELEGRAM_BOT_CHAT_ID,
        //     text: `${latestNewsInfo.title}`,
        //     parse_mode: 'Markdown',
        //     disable_web_page_preview: true,
        //     reply_markup: {
        //         inline_keyboard: [
        //             [{ text: 'Leia mais', url: latestNewsInfo.link }]
        //         ]
        //     }
        // }).then(response => {
        //     console.log(Date() + '- Telegram message sent');
        // }).catch(console.error);

        axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, {
            chat_id: TELEGRAM_BOT_CHAT_ID,
            photo: latestNewsInfo.imageUrl,
            caption: `${latestNewsInfo.title}`,
            parse_mode: 'Markdown',
            disable_web_page_preview: true,
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Leia mais', url: latestNewsInfo.link }]
                ]
            }
        }).then(response => {
            console.log(Date() + '- Telegram message sent');
        }).catch(console.error);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { postNews };