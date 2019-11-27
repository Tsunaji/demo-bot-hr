const db = require('../config/db');
const sequelize = db.sequelize;

class MenuController {

    async getAllMenu() {
        const query = `SELECT * FROM chatbot_hr_menu where active_status = '1'`;
        const response = await sequelize.query(query,
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

    async getMainMenu() {
        const query = `select main_menu from chatbot_hr_menu where active_status = '1' group by main_menu`;
        const response = await sequelize.query(query,
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

    async getMenuByMainMenu(input) {
        const query = `select * from chatbot_hr_menu where main_menu = '${input}' and active_status = '1' order by sub_menu`;
        const response = await sequelize.query(query,
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
        const query = `select * from digitals_shera.chatbot_hr_menu where main_menu = '${input}' and active_status = '1' order by sub_menu`;
        const response = await sequelize.query(query,
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
        const query = `select question from chatbot_hr_menu where active_status = '1' order by rand() limit 3`;
        const response = await sequelize.query(query,
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
        const query = `select question from chatbot_hr_menu where question like '%${input}%' and active_status = '1' limit 6`;
        const response = await sequelize.query(query,
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

exports.MenuController = MenuController;