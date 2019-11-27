const { CardFactory } = require('botbuilder');

class CardService {

    openUrlButton(input) {
        var cards = CardFactory.heroCard(
            '',
            '',
            [],
            CardFactory.actions([
                {
                    type: 'openUrl',
                    title: 'Open Link',
                    value: input
                }
            ])
        )
        return cards;
    }

}

module.exports.CardService = CardService;