const { CardFactory } = require('botbuilder');
const string = require('../config/string');

class MenuCard {

    welcome(data) {

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

        var card = CardFactory.heroCard(
            'Welcome to SHERA HR Bot',
            string.welcomeDetailText,
            ['https://www.shera.com/web-upload/tinymce/725507023.png'],
            CardFactory.actions(mainMenu)
        )

        return card;

    }

    randomSuggest(data) {

        const questions = [];

        data.forEach((element) => {
            questions.push(element.question);
        });

        var card = CardFactory.heroCard(
            '',
            '',
            [],
            CardFactory.actions(questions)
        )
        return card;
    }

    suggestByInput(data) {

        const questions = [];

        data.forEach((element) => {
            questions.push(element.question);
        });

        var card = CardFactory.heroCard(
            '',
            '',
            [],
            CardFactory.actions(questions)
        )
        return card;
    }

    subMenuByMainMenu(data) {

        let card = [];
        let cardActions = [];
        let action = {};
        let subTemp = '';

        for (let i = 0; i < data.length; i++) {
            if (subTemp !== data[i].sub_menu) {
                if (i != 0) {
                    card.push(CardFactory.heroCard(
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
                card.push(CardFactory.heroCard(
                    subTemp,
                    [],
                    CardFactory.actions(cardActions)
                ))
            }
        }
        return card;
    }

}

module.exports.MenuCard = MenuCard;