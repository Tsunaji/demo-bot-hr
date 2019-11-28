const { MenuService } = require('../services/MenuService');
const { MenuCard } = require('../cards/MenuCard');

const menuService = new MenuService();
const menuCard = new MenuCard();

class MenuController {

    async welcome() {

        const data = await menuService.getMainMenu();

        return menuCard.welcome(data);

    }

    async randomSuggest() {

        const data = await menuService.getRandomQuestion();

        return menuCard.randomSuggest(data);

    }

    async suggestByInput(input) {

        const data = await menuService.getQuestionByInput(input);

        return menuCard.suggestByInput(data);

    }

    async subMenuByMainMenu(input) {

        const data = await menuService.getSubMenuByMainMenu(input);

        return menuCard.subMenuByMainMenu(data);

    }

}

module.exports.MenuController = MenuController;