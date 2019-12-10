const { LuisService } = require('../services/LuisService');

const luisService = new LuisService();

class LuisController {

    async getEntities(utterance) {
        const prediction = await luisService.getPrediction(utterance);
        // console.log(prediction);
        return prediction.prediction.entities;
    }

}

module.exports.LuisController = LuisController;