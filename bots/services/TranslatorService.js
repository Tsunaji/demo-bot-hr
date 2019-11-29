const axios = require('axios');
const config = require('../config/config');

class TranslatorService {

    async getTranslateToThai(input) {
        return await axios({
            method: 'post',
            url: config.microsoftTranslatorEndpoint,
            params: {
                'api-version': '3.0',
                'to': 'th'
            },
            headers: {
                'Ocp-Apim-Subscription-Key': config.microsoftTranslatorKey,
                'Content-Type': 'application/json; charset=UTF-8'
            },
            data: [{
                'text': input
            }]
        })
            .then(response => {
                // console.log(response.data[0]);
                return response.data[0];
            })
            .catch((error) => {
                console.log(error.response);
            });
    }

    async getTranslateToEng(input) {
        return await axios({
            method: 'post',
            url: config.microsoftTranslatorEndpoint,
            params: {
                'api-version': '3.0',
                'to': 'en'
            },
            headers: {
                'Ocp-Apim-Subscription-Key': config.microsoftTranslatorKey,
                'Content-Type': 'application/json; charset=UTF-8'
            },
            data: [{
                'text': input
            }]
        })
            .then(response => {
                // console.log(response.data[0]);
                return response.data[0];
            })
            .catch((error) => {
                console.log(error.response);
            });
    }

}

module.exports.TranslatorService = TranslatorService;