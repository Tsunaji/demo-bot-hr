// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { AttachmentLayoutTypes, ActivityHandler } = require('botbuilder');
const { LuisRecognizer, QnAMaker } = require('botbuilder-ai');
const { MenuController } = require('./controllers/MenuController');
const { LuisController } = require('./controllers/LuisController');
const { SuggestController } = require('./controllers/SuggestController');
const { SubMenuController } = require('./controllers/SubMenuController');
const string = require('./config/string');

const luisController = new LuisController();
const menuController = new MenuController();
const subMenuController = new SubMenuController();
const suggestController = new SuggestController();

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
                await this.processGreeting(context);
                break;
            case 'l_recruitment':
            case 'l_payroll':
            case 'l_training':
            case 'l_welfare':
                await this.processSubMenu(context);
                break;
            case 'q_recruitment':
            case 'q_payroll':
            case 'q_training':
            case 'q_welfare':
            case 'q_simple_question':
                await this.processQnA(context);
                break;
            case 'q_suggestion':
                await this.processSuggestion(context);
                break;
            case 'l_cancel':
                await this.processCancel(context);
                break;
            case 'None':
                await this.processQnA(context);
                break;
            default:
                console.log(`Dispatch unrecognized intent: ${intent}.`);
                await this.processQnA(context);
                break;
        }
    }

    async processGreeting(context) {
        await context.sendActivity(string.welcomeText);
        await context.sendActivity({ attachments: [await menuController.welcome()] });
    }

    async processCancel(context) {
        await context.sendActivity(string.cancelText);
        await context.sendActivity({ attachments: [await menuController.welcome()] });
    }

    async processSubMenu(context) {
        const utterance = context.activity.text;
        const card = await subMenuController.getSubMenuCard(utterance, context);

        await context.sendActivity({
            attachments: card,
            attachmentLayout: AttachmentLayoutTypes.Carousel
        });
    }

    async processSuggestion(context) {
        const results = await this.qnaMaker.getAnswers(context);
        if (results.length > 0) {
            await context.sendActivity(string.welcomeToSuggest);
            await context.sendActivity(results[0].answer);
        } else {
            await context.sendActivity(string.suggestionNotReady);
            await context.sendActivity({ attachments: [await menuController.welcome()] });
        }
    }

    async processQnA(context) {
        const results = await this.qnaMaker.getAnswers(context);
        if (results.length > 0) {
            await context.sendActivity(results[0].answer);
        } else {
            const card = await suggestController.getSuggestCard(context.activity.text, context);
            await context.sendActivity({ attachments: [card] });
        }
    }
}

module.exports.DispatchBot = DispatchBot;
