const Loggram = require('loggram');
require('dotenv').config()
const TELEGRAM_ERROR_BOT_TOKEN = process.env.TELEGRAM_ERROR_BOT_TOKEN;
const TELEGRAM_ERROR_CHAT_ID = process.env.TELEGRAM_ERROR_CHAT_ID;

function sendErrorLog(error) {
    var loggram = new Loggram(TELEGRAM_ERROR_BOT_TOKEN, TELEGRAM_ERROR_CHAT_ID);
    loggram.sendLog('DevInformado', 'error', error).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });
}

module.exports = { sendErrorLog };