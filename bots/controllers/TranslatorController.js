const { TranslatorService } = require('../services/TranslatorService');

const translatorService = new TranslatorService();

class TranslatorController {

    async translateToThai(input) {
        const thaiText = await translatorService.getTranslateToThai(input);
        return thaiText.translations[0].text;

    }

    async translateToEng(input) {
        const engText = await translatorService.getTranslateToEng(input);
        return engText.translations[0].text;
    }

}

module.exports.TranslatorController = TranslatorController;