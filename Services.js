const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');

class Services {

    async getMenuAll() {

        const mySqlDatabase = process.env.MYSQL_DATABASE || process.env.APPSETTING_MYSQL_DATABASE;
        const mySqlUser = process.env.MYSQL_USER || process.env.APPSETTING_MYSQL_USER;
        const mySqlPassword = process.env.MYSQL_PASSWORD || process.env.APPSETTING_MYSQL_PASSWORD;
        const mySqlHost = process.env.MYSQL_HOST || process.env.APPSETTING_MYSQL_HOST;

        const sequelize = new Sequelize(mySqlDatabase, mySqlUser, mySqlPassword, {
            dialect: 'mysql',
            host: mySqlHost,
            dialectOptions: {
                ssl: {
                    ca: fs.readFileSync(path.join(__dirname, '/BaltimoreCyberTrustRoot.crt.pem'))
                }
            }
        });

        const response = await sequelize.query(`SELECT * FROM chatbot_hr_menu where active_status = '1'`,
            {
                raw: true
            }).then(myTableRows => {
                return myTableRows[0];
            }).catch(function (err) {
                console.log(err);
                // return [];
            });
        return response;
    }

    async getMainMenu() {

        const mySqlDatabase = process.env.MYSQL_DATABASE || process.env.APPSETTING_MYSQL_DATABASE;
        const mySqlUser = process.env.MYSQL_USER || process.env.APPSETTING_MYSQL_USER;
        const mySqlPassword = process.env.MYSQL_PASSWORD || process.env.APPSETTING_MYSQL_PASSWORD;
        const mySqlHost = process.env.MYSQL_HOST || process.env.APPSETTING_MYSQL_HOST;

        const sequelize = new Sequelize(mySqlDatabase, mySqlUser, mySqlPassword, {
            dialect: 'mysql',
            host: mySqlHost,
            dialectOptions: {
                ssl: {
                    ca: fs.readFileSync(path.join(__dirname, '/BaltimoreCyberTrustRoot.crt.pem'))
                }
            }
        });

        const response = await sequelize.query(`select main_menu from digitals_shera.chatbot_hr_menu group by main_menu`,
            {
                raw: true
            }).then(myTableRows => {
                return myTableRows[0];
            }).catch(function (err) {
                // console.log(err);
                return [];
            });
        return response;
    }

    async getSubMenuByMainMenu(input) {

        const mySqlDatabase = process.env.MYSQL_DATABASE || process.env.APPSETTING_MYSQL_DATABASE;
        const mySqlUser = process.env.MYSQL_USER || process.env.APPSETTING_MYSQL_USER;
        const mySqlPassword = process.env.MYSQL_PASSWORD || process.env.APPSETTING_MYSQL_PASSWORD;
        const mySqlHost = process.env.MYSQL_HOST || process.env.APPSETTING_MYSQL_HOST;

        const sequelize = new Sequelize(mySqlDatabase, mySqlUser, mySqlPassword, {
            dialect: 'mysql',
            host: mySqlHost,
            dialectOptions: {
                ssl: {
                    ca: fs.readFileSync(path.join(__dirname, '/BaltimoreCyberTrustRoot.crt.pem'))
                }
            }
        });

        const response = await sequelize.query(`select * from digitals_shera.chatbot_hr_menu where main_menu = '${input}' and active_status = '1' order by sub_menu`,
            {
                raw: true
            }).then(myTableRows => {
                return myTableRows[0];
            }).catch(function (err) {
                // console.log(err);
                return [];
            });
        return response;
    }

    async getQuestionByInput(input) {

        const mySqlDatabase = process.env.MYSQL_DATABASE || process.env.APPSETTING_MYSQL_DATABASE;
        const mySqlUser = process.env.MYSQL_USER || process.env.APPSETTING_MYSQL_USER;
        const mySqlPassword = process.env.MYSQL_PASSWORD || process.env.APPSETTING_MYSQL_PASSWORD;
        const mySqlHost = process.env.MYSQL_HOST || process.env.APPSETTING_MYSQL_HOST;

        const sequelize = new Sequelize(mySqlDatabase, mySqlUser, mySqlPassword, {
            dialect: 'mysql',
            host: mySqlHost,
            dialectOptions: {
                ssl: {
                    ca: fs.readFileSync(path.join(__dirname, '/BaltimoreCyberTrustRoot.crt.pem'))
                }
            }
        });

        const response = await sequelize.query(`select question from digitals_shera.chatbot_hr_menu where question like '%${input}%' and active_status = '1' limit 6`,
            {
                raw: true
            }).then(myTableRows => {
                return myTableRows[0];
            }).catch(function (err) {
                // console.log(err);
                return [];
            });
        return response;
    }

    async getRandomQuestion() {

        const mySqlDatabase = process.env.MYSQL_DATABASE || process.env.APPSETTING_MYSQL_DATABASE;
        const mySqlUser = process.env.MYSQL_USER || process.env.APPSETTING_MYSQL_USER;
        const mySqlPassword = process.env.MYSQL_PASSWORD || process.env.APPSETTING_MYSQL_PASSWORD;
        const mySqlHost = process.env.MYSQL_HOST || process.env.APPSETTING_MYSQL_HOST;

        const sequelize = new Sequelize(mySqlDatabase, mySqlUser, mySqlPassword, {
            dialect: 'mysql',
            host: mySqlHost,
            dialectOptions: {
                ssl: {
                    ca: fs.readFileSync(path.join(__dirname, '/BaltimoreCyberTrustRoot.crt.pem'))
                }
            }
        });

        const response = await sequelize.query(`select question from digitals_shera.chatbot_hr_menu where active_status = '1' order by rand() limit 3`,
            {
                raw: true
            }).then(myTableRows => {
                return myTableRows[0];
            }).catch(function (err) {
                // console.log(err);
                return [];
            });
        return response;
    }

}

exports.Services = Services;