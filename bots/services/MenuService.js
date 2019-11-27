const { CardFactory } = require('botbuilder');
const { MenuController } = require('../controllers/MenuController');
const string = require('../config/string');

const menuController = new MenuController();

class MenuService {

    async welcome() {

        const data = await menuController.getMainMenu();

        const mainMenu = [];

        data.forEach(element => {
            let obj = {};
            obj.type = 'imBack';
            obj.title = element.main_menu;
            obj.value = element.main_menu;
            mainMenu.push(obj);
        });

        //Fix Suggestion menu for suggest a question to HR by Microsoft Forms link
        mainMenu.push(
            {
                type: 'imBack',
                title: 'Suggestion',
                value: 'Suggestion'
            }
        );

        var cards = CardFactory.heroCard(
            'Welcome to SHERA HR Bot',
            string.welcomeDetailText,
            ['https://www.shera.com/web-upload/tinymce/725507023.png'],
            CardFactory.actions(mainMenu)
        )

        return cards;
    }

    async randomSuggest() {

        const data = await menuController.getRandomQuestion();

        const questions = [];

        data.forEach((element) => {
            questions.push(element.question);
        });

        var cards = CardFactory.heroCard(
            '',
            '',
            [],
            CardFactory.actions(questions)
        )
        return cards;
    }

    async suggestByInput(input) {

        const data = await menuController.getQuestionByInput(input);

        const questions = [];

        data.forEach((element) => {
            questions.push(element.question);
        });

        var cards = CardFactory.heroCard(
            '',
            '',
            [],
            CardFactory.actions(questions)
        )
        return cards;
    }

    async subMenuByMainMenu(input) {

        const data = await menuController.getSubMenuByMainMenu(input);

        let cards = [];
        let cardActions = [];
        let action = {};
        let subTemp = '';

        for (let i = 0; i < data.length; i++) {
            if (subTemp !== data[i].sub_menu) {
                if (i != 0) {
                    cards.push(CardFactory.heroCard(
                        subTemp,
                        [],
                        CardFactory.actions(cardActions)
                    ))
                    cardActions = [];
                }
                subTemp = data[i].sub_menu;
            }

            action.type = 'imBack';
            action.title = data[i].question;
            action.value = data[i].question;

            cardActions.push(action);

            action = {};

            if (i === data.length - 1) {
                cards.push(CardFactory.heroCard(
                    subTemp,
                    [],
                    CardFactory.actions(cardActions)
                ))
            }
        }
        return cards;
    }

}

module.exports.MenuService = MenuService;