const { LuisController } = require('./LuisController');
const { MenuController } = require('./MenuController');
const string = require('../config/string');

const luisController = new LuisController();
const menuController = new MenuController();

class SubMenuController {

    async getSubMenuCard(utterance, context) {
        console.log(`get sub menu`)
        let card = await menuController.subMenuByMainMenu(utterance)

        //if no card maybe input sub menu by Thai
        //try to translate to Eng and search again
        if (card.length <= 0) {
            const keyword = await luisController.parseKeywordEntity(utterance);
            card = await menuController.subMenuByMainMenu(keyword)
        }

        //if still have no card then return random
        if (card.length <= 0) {
            await context.sendActivity(string.randomSuggestText);
            const subCard = await menuController.randomSuggest();
            card.push(subCard);
        }
        return card;
    }

}
module.exports.SubMenuController = SubMenuController;