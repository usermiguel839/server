const axios = require("axios");

const BOT_URL = process.env.BOT_URL;

/*==========================================
            CREATE RECRUITMENT
==========================================*/

async function createRecruitment(data) {

    try {

        await axios({

            method: "POST",

            url: `${BOT_URL}/api/recruitment/create`,

            headers: {

                Authorization: process.env.API_KEY,

                "Content-Type": "application/json"

            },

            data

        });

    }

    catch (error) {

        console.error("");

        console.error("Erro ao comunicar com o Bot.");

        console.error(error.message);

        console.error("");

    }

}

/*==========================================
                APPROVE
==========================================*/

async function approveRecruitment(id) {

    try {

        await axios.patch(

            `${BOT_URL}/api/recruitment/${id}/approve`,

            {},

            {

                headers: {

                    Authorization: process.env.API_KEY

                }

            }

        );

    }

    catch (error) {

        console.error("");

        console.error("Erro ao aprovar recrutamento.");

        console.error(error.message);

        console.error("");

    }

}

/*==========================================
                REJECT
==========================================*/

async function rejectRecruitment(id) {

    try {

        await axios.patch(

            `${BOT_URL}/api/recruitment/${id}/reject`,

            {},

            {

                headers: {

                    Authorization: process.env.API_KEY

                }

            }

        );

    }

    catch (error) {

        console.error("");

        console.error("Erro ao reprovar recrutamento.");

        console.error(error.message);

        console.error("");

    }

}

/*==========================================
                EXPORT
==========================================*/

module.exports = {

    createRecruitment,

    approveRecruitment,

    rejectRecruitment

};
