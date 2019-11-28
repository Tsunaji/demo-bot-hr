const { CardFactory } = require('botbuilder');

class CustomCard {

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

module.exports.CustomCard = CustomCard;