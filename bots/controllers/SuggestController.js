const { LuisController } = require('./LuisController');
const { TranslatorController } = require('./TranslatorController');
const { MenuController } = require('./MenuController');
const string = require('../config/string');

const luisController = new LuisController();
const menuController = new MenuController();
const translatorController = new TranslatorController();

class SuggestController {

    async getSuggestCard(utterance, context) {
        const keyword = await luisController.parseKeywordEntity(utterance);
        const card = await this.cardByKeywordOrWholeText(keyword, utterance);
        return await this.suggestByKeywordOrRandom(card, context);
    }

    async cardByKeywordOrWholeText(keyword, utterance) {
        if (keyword !== '') {
            return await this.suggestByKeywordEngOrThaiSelection(keyword);
        } else {
            return await menuController.suggestByInput(utterance);
        }
    }

    async suggestByKeywordEngOrThaiSelection(keyword) {
        let card = {}
        card = await menuController.suggestByInput(keyword);
        if (card.content.buttons.length > 0) {
            return card;
        } else {
            const keywordToThai = await translatorController.translateToThai(keyword);
            card = await menuController.suggestByInput(keywordToThai);
            return card;
        }
    }

    async suggestByKeywordOrRandom(card, context) {
        if (card.content.buttons.length > 0) {
            await context.sendActivity(string.suggestByInputText);
            return card;
        } else {
            await context.sendActivity(string.randomSuggestText);
            return await menuController.randomSuggest();
        }
    }

}
module.exports.SuggestController = SuggestController;