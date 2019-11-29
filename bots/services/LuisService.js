const axios = require('axios');
const config = require('../config/config');

class LuisService {

    async getPrediction(utterance) {

        var slots = config.luisSlots;
        var apps = config.luisAppId;
        var path = `luis/prediction/v3.0/apps/${apps}/slots/${slots}/predict`;

        return await axios({
            method: 'get',
            url: config.luisAPIHostName + path,
            params: {
                'query': utterance,
                'verbose': 'true'
            },
            headers: {
                'Ocp-Apim-Subscription-Key': config.luisAPIKey,
                'Content-Type': 'application/json; charset=UTF-8'
            }
        })
            .then(response => {
                // console.log(response.data);
                return response.data;
            })
            .catch((error) => {
                console.log(error.response);
            });
    }

}

module.exports.LuisService = LuisService;