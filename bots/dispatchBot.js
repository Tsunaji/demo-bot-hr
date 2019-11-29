// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { AttachmentLayoutTypes, ActivityHandler } = require('botbuilder');
const { LuisRecognizer, QnAMaker } = require('botbuilder-ai');
const { TranslatorController } = require('./controllers/TranslatorController');
const { MenuController } = require('./controllers/MenuController');
const { LuisController } = require('./controllers/LuisController');
const { CustomCard } = require('./cards/CustomCard');
const string = require('./config/string');

const luisController = new LuisController();
const translatorController = new TranslatorController();
const menuController = new MenuController();
const customCard = new CustomCard();

class DispatchBot extends ActivityHandler {
    constructor() {
        super();

        const dispatchRecognizer = new LuisRecognizer({
            applicationId: process.env.LuisAppId,
            endpointKey: process.env.LuisAPIKey,
            endpoint: process.env.LuisAPIHostName
        }, {
            includeAllIntents: true,
            includeInstanceData: true
        }, true);

        const qnaMaker = new QnAMaker({
            knowledgeBaseId: process.env.QnAKnowledgebaseId,
            endpointKey: process.env.QnAEndpointKey,
            host: process.env.QnAEndpointHostName
        });

        this.dispatchRecognizer = dispatchRecognizer;
        this.qnaMaker = qnaMaker;

        this.onMessage(async (context, next) => {

            console.log('Processing Message Activity.');

            // console.log(context);

            const utterance = (context.activity.text || '').trim().toLowerCase();
            console.log("utterance = " + utterance);

            // First, we use the dispatch model to determine which cognitive service (LUIS or QnA) to use.
            const recognizerResult = await dispatchRecognizer.recognize(context);

            // Top intent tell us which cognitive service to use.
            const intent = LuisRecognizer.topIntent(recognizerResult);

            // Next, we call the dispatcher with the top intent.
            await this.dispatchToTopIntentAsync(context, intent, recognizerResult);

            await next();
        });

        this.onMembersAdded(async (context, next) => {

            // const welcomeText = 'Type a greeting or a question about the weather to get started.';
            const membersAdded = context.activity.membersAdded;

            for (let member of membersAdded) {
                if (member.id !== context.activity.recipient.id) {
                    console.log(`${member.name} added`);
                }
            }

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }

    async dispatchToTopIntentAsync(context, intent, recognizerResult) {

        console.log(recognizerResult.luisResult);

        switch (intent) {
            case 'l_greeting':
                await this.processGreeting(context, recognizerResult);
                break;
            case 'l_recruitment':
            case 'l_payroll':
            case 'l_training':
            case 'l_welfare':
                await this.processSubMenu(context, recognizerResult);
                break;
            case 'q_recruitment':
            case 'q_payroll':
            case 'q_training':
            case 'q_welfare':
            case 'q_simple_question':
                await this.processQnA(context, recognizerResult);
                break;
            case 'q_suggestion':
                await this.processSuggestion(context, recognizerResult);
                break;
            case 'l_cancel':
                await this.processCancel(context);
                break;
            case 'None':
                await this.processQnA(context, recognizerResult);
                break;
            default:
                console.log(`Dispatch unrecognized intent: ${intent}.`);
                await this.processNone(context);
                break;
        }
    }

    async processGreeting(context, luisResult, luisResultEng) {
        console.log('processGreeting');

        await context.sendActivity(string.welcomeText);
        await context.sendActivity({ attachments: [await menuController.welcome()] });
    }

    async processSubMenu(context, luisResult, luisResultEng) {
        console.log('processSubMenu');

        await context.sendActivity({
            attachments: await menuController.subMenuByMainMenu(context.activity.text),
            attachmentLayout: AttachmentLayoutTypes.Carousel
        });
    }

    async processQnA(context, luisResult, luisResultEng) {
        console.log('processQnA');

        const results = await this.qnaMaker.getAnswers(context);

        if (results.length > 0) {
            await context.sendActivity(`${results[0].answer}`);
        } else {

            var keyword = await this.findKeyword(context.activity.text);
            let card = {};

            if (keyword === "") {
                card = await menuController.suggestByInput(context.activity.text);
            } else {
                card = await this.keywordSelection(keyword);
            }
            //search by input word or random
            if (card.content.buttons.length > 0) {
                await context.sendActivity(string.suggestByInputText);
                await context.sendActivity({ attachments: [card] });
            } else {
                await context.sendActivity(string.randomSuggestText);
                await context.sendActivity({ attachments: [await menuController.randomSuggest()] });
            }
        }
    }

    async processSuggestion(context, luisResult, luisResultEng) {
        console.log('processSuggestion');

        const results = await this.qnaMaker.getAnswers(context);

        if (results.length > 0) {
            await context.sendActivity(string.welcomeToSuggest);
            await context.sendActivity({ attachments: [customCard.openUrlButton(results[0].answer)] });
        } else {
            await context.sendActivity(string.suggestionNotReady);
            await context.sendActivity({ attachments: [await menuController.welcome()] });
        }
    }

    async processCancel(context) {
        console.log('processCancel');
        await context.sendActivity(string.cancelText);
        await context.sendActivity({ attachments: [await menuController.welcome()] });
    }

    async findKeyword(utterance) {
        const utteranceEng = await translatorController.translateToEng(utterance);
        const entity = await luisController.getEntities(utteranceEng);
        var keyword = "";
        console.log(entity);
        for (var key in entity['$instance']) {
            keyword = entity['$instance'][key][0].text;
            console.log(entity['$instance'][key]);
            break;
        }
        console.log('keyword: ' + keyword);
        return keyword;
    }

    async keywordSelection(keyword) {

        var card = {}

        card = await menuController.suggestByInput(keyword);

        if (card.content.buttons.length > 0) {
            console.log('eng');
            return card;
        } else {
            console.log('th');
            var keywordToThai = await translatorController.translateToThai(keyword);
            return card = await menuController.suggestByInput(keywordToThai);
        }

    }
}

module.exports.DispatchBot = DispatchBot;
