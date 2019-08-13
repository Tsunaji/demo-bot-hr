// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { AttachmentLayoutTypes, ActivityHandler } = require('botbuilder');
const { LuisRecognizer, QnAMaker } = require('botbuilder-ai');
const { CardFactory } = require('botbuilder-core');
const WelcomeCard = require('./resources/welcomeCard.json');
const { MyMenu } = require('./myMenu');

const myMenu = new MyMenu();

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
                    // await context.sendActivity(`Welcome to Dispatch bot ${member.name}. ${welcomeText}`);

                    await context.sendActivity({ attachments: [myMenu.welcome()] });
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
                await this.processRecruitment(context, recognizerResult);
                break;
            case 'l_payroll':
                await this.processPayroll(context, recognizerResult);
                break;
            case 'l_training':
                await this.processTraining(context, recognizerResult);
                break;
            case 'l_welfare':
                await this.processWelfare(context, recognizerResult);
                break;
            case 'q_recruitment':
            case 'q_payroll':
            case 'q_training':
            case 'q_welfare':
            case 'q_simple_question':
                await this.processQnA(context, recognizerResult);
                break;
            case 'l_cancel':
                await this.processCancel(context);
                break;
            case 'None':
                await this.processNone(context);
                break;
            default:
                console.log(`Dispatch unrecognized intent: ${intent}.`);
                await context.sendActivity(`Dispatch unrecognized intent: ${intent}.`);
                break;
        }
    }

    async processGreeting(context, luisResult) {
        console.log('processGreeting');

        await context.sendActivity(`สวัสดีค่ะ มีอะไรให้ช่วย ลองดูที่รายการด้านล่างนี้นะคะ`);
        await context.sendActivity({ attachments: [myMenu.welcome()] });
    }

    async processRecruitment(context, luisResult) {
        console.log('processRecruitment');

        console.log(luisResult.luisResult);

        await context.sendActivity({
            attachments: myMenu.recruitment(),
            attachmentLayout: AttachmentLayoutTypes.Carousel
        });
    }

    async processPayroll(context, luisResult) {
        console.log('processPayroll');

        console.log(luisResult.luisResult);

        await context.sendActivity({
            attachments: myMenu.payroll(),
            attachmentLayout: AttachmentLayoutTypes.Carousel
        });
    }

    async processTraining(context, luisResult) {
        console.log('processTraining');

        console.log(luisResult.luisResult);

        await context.sendActivity({
            attachments: myMenu.training(),
            attachmentLayout: AttachmentLayoutTypes.Carousel
        });
    }

    async processWelfare(context, luisResult) {
        console.log('processWelfare');

        console.log(luisResult.luisResult);

        await context.sendActivity({
            attachments: myMenu.welfare(),
            attachmentLayout: AttachmentLayoutTypes.Carousel
        });
    }

    async processQnA(context, luisResult) {
        console.log('processQnA');

        console.log(luisResult.luisResult);

        const results = await this.qnaMaker.getAnswers(context);

        if (results.length > 0) {
            console.log(results.length);
            await context.sendActivity(`${results[0].answer}`);
        } else {

            await context.sendActivity(`ขออภัยค่ะ ไม่พบคำตอบในฐานข้อมูล\n ลองเลือกดูตามรายการด้านล่างนี้นะคะ`);
            await context.sendActivity({ attachments: [myMenu.welcome()] });
        }
    }

    async processCancel(context) {
        console.log('processCancel');

        await context.sendActivity(`ยกเลิกให้แล้วค่ะ`);
        await context.sendActivity({ attachments: [myMenu.welcome()] });
    }

    async processNone(context) {
        console.log('processNone');

        await context.sendActivity(`ไม่เข้าใจค่ะ ลองเลือกดูรายการด้านล่างนี้นะคะ`);
        await context.sendActivity({ attachments: [myMenu.welcome()] });
    }
}

module.exports.DispatchBot = DispatchBot;
