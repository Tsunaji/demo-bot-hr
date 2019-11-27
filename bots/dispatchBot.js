// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { AttachmentLayoutTypes, ActivityHandler } = require('botbuilder');
const { LuisRecognizer, QnAMaker } = require('botbuilder-ai');
const string = require('./config/string');
const { MenuService } = require('./services/MenuService');
const { CardService } = require('./services/CardService');

const menuService = new MenuService();
const cardService = new CardService();

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

    async processGreeting(context, luisResult) {
        console.log('processGreeting');
        // console.log(luisResult.luisResult);

        await context.sendActivity(string.welcomeText);
        await context.sendActivity({ attachments: [await menuService.welcome()] });
    }

    async processSubMenu(context, luisResult) {
        console.log('processSubMenu');
        // console.log(luisResult.luisResult);

        await context.sendActivity({
            attachments: await menuService.subMenuByMainMenu(context.activity.text),
            attachmentLayout: AttachmentLayoutTypes.Carousel
        });
    }

    async processQnA(context, luisResult) {
        console.log('processQnA');
        // console.log(luisResult.luisResult);

        const results = await this.qnaMaker.getAnswers(context);

        if (results.length > 0) {
            await context.sendActivity(`${results[0].answer}`);
        } else {
            var cards = await menuService.suggestByInput(context.activity.text);
            //search by input word or random
            if (cards.content.buttons.length > 0) {
                await context.sendActivity(string.suggestByInputText);
                await context.sendActivity({ attachments: [await menuService.suggestByInput(context.activity.text)] });
            } else {
                await context.sendActivity(string.randomSuggestText);
                await context.sendActivity({ attachments: [await menuService.randomSuggest()] });
            }
        }
    }

    async processSuggestion(context, luisResult) {
        console.log('processSuggestion');
        // console.log(luisResult.luisResult);

        const results = await this.qnaMaker.getAnswers(context);

        if (results.length > 0) {
            await context.sendActivity(string.welcomeToSuggest);
            await context.sendActivity({ attachments: [cardService.openUrlButton(results[0].answer)] });
        } else {
            await context.sendActivity(string.suggestionNotReady);
            await context.sendActivity({ attachments: [await menuService.welcome()] });
        }
    }

    async processCancel(context) {
        console.log('processCancel');
        await context.sendActivity(string.cancelText);
        await context.sendActivity({ attachments: [await menuService.welcome()] });
    }
}

module.exports.DispatchBot = DispatchBot;
