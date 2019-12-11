const { LuisService } = require('../services/LuisService');
const { TranslatorController } = require('../controllers/TranslatorController');

const luisService = new LuisService();
const translatorController = new TranslatorController();

class LuisController {

    async getEntities(utterance) {
        const prediction = await luisService.getPrediction(utterance);
        return prediction.prediction.entities;
    }

    async parseKeywordEntity(utterance) {
        const utteranceEng = await translatorController.translateToEng(utterance);
        const Entities = await this.getEntities(utteranceEng);
        let keywordValue = '';
        if (typeof Entities.keyword !== "undefined") {
            keywordValue = Entities.keyword[0];
        } else if (typeof Entities.keyword_synonym !== "undefined") {
            keywordValue = Entities.keyword_synonym[0][0];
        }
        return keywordValue;
    }

}

module.exports.LuisController = LuisController;