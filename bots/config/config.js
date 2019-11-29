// This will load our .env file and add the values to process.env
require('dotenv').config({ silent: true });
const path = require('path');
const fs = require('fs');

const config = {
    mySqlDatabase: process.env.MYSQL_DATABASE || process.env.APPSETTING_MYSQL_DATABASE,
    mySqlUser: process.env.MYSQL_USER || process.env.APPSETTING_MYSQL_USER,
    mySqlPassword: process.env.MYSQL_PASSWORD || process.env.APPSETTING_MYSQL_PASSWORD,
    mySqlHost: process.env.MYSQL_HOST || process.env.APPSETTING_MYSQL_HOST,
    dialect: 'mysql',
    dialectOptions: {
        ssl: {
            ca: fs.readFileSync(path.join(__dirname, '/BaltimoreCyberTrustRoot.crt.pem'))
        }
    },
    microsoftTranslatorEndpoint: 'https://api.cognitive.microsofttranslator.com/translate',
    microsoftTranslatorApiVersion: '3.0',
    microsoftTranslatorKey: process.env.MicrosoftTranslatorKey || process.env.MicrosoftTranslatorKey,
    luisAppId: process.env.LuisAppId || process.env.LuisAppId,
    luisAPIKey: process.env.LuisAPIKey || process.env.LuisAPIKey,
    luisAPIHostName: 'https://southeastasia.api.cognitive.microsoft.com/',
    luisSlots: 'production'
};

module.exports = config;