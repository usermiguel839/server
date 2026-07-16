const { v4: uuid } = require("uuid");

const database = require("../database/database");

const botService = require("../services/botService");

/*==========================================
                CREATE
==========================================*/

async function create(req, res) {

    try {

        const {
            nickname,
            discord,
            idade,
            plataforma,
            tempoOnline,
            motivo
        } = req.body;

        if (
            !nickname ||
            !discord ||
            !idade ||
            !plataforma ||
            !tempoOnline ||
            !motivo
        ) {

            return res.status(400).json({

                success: false,

                message: "Todos os campos são obrigatórios."

            });

        }

        const db = database.getDatabase();

        const id = uuid();

        const now = new Date().toISOString();

        db.prepare(`

            INSERT INTO recrutamentos (

                id,
                nickname,
                discord,
                idade,
                plataforma,
                tempoOnline,
                motivo,
                status,
                createdAt,
                updatedAt

            )

            VALUES (

                @id,
                @nickname,
                @discord,
                @idade,
                @plataforma,
                @tempoOnline,
                @motivo,
                'ANALISE',
                @createdAt,
                @updatedAt

            )

        `).run({

            id,
            nickname,
            discord,
            idade,
            plataforma,
            tempoOnline,
            motivo,
            createdAt: now,
            updatedAt: now

        });

        await botService.createRecruitment({

            id,
            nickname,
            discord,
            idade,
            plataforma,
            tempoOnline,
            motivo

        });

        return res.json({

            success: true,

            id

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Erro interno."

        });

    }

}

/*==========================================
                LIST
==========================================*/

function list(req, res) {

    const db = database.getDatabase();

    const recrutamentos = db

        .prepare("SELECT * FROM recrutamentos ORDER BY createdAt DESC")

        .all();

    res.json(recrutamentos);

}

/*==========================================
                FIND
==========================================*/

function find(req, res) {

    const db = database.getDatabase();

    const recrutamento = db

        .prepare("SELECT * FROM recrutamentos WHERE id = ?")

        .get(req.params.id);

    if (!recrutamento) {

        return res.status(404).json({

            success: false,

            message: "Recrutamento não encontrado."

        });

    }

    res.json(recrutamento);

}

/*==========================================
                APPROVE
==========================================*/

async function approve(req, res) {

    const db = database.getDatabase();

    const id = req.params.id;

    db.prepare(`

        UPDATE recrutamentos

        SET

            status = 'APROVADO',

            updatedAt = ?

        WHERE id = ?

    `).run(

        new Date().toISOString(),

        id

    );

    await botService.approveRecruitment(id);

    res.json({

        success: true

    });

}

/*==========================================
                REJECT
==========================================*/

async function reject(req, res) {

    const db = database.getDatabase();

    const id = req.params.id;

    db.prepare(`

        UPDATE recrutamentos

        SET

            status = 'REPROVADO',

            updatedAt = ?

        WHERE id = ?

    `).run(

        new Date().toISOString(),

        id

    );

    await botService.rejectRecruitment(id);

    res.json({

        success: true

    });

}

/*==========================================
                REMOVE
==========================================*/

function remove(req, res) {

    const db = database.getDatabase();

    db.prepare(

        "DELETE FROM recrutamentos WHERE id = ?"

    ).run(

        req.params.id

    );

    res.json({

        success: true

    });

}

/*==========================================
                EXPORT
==========================================*/

module.exports = {

    create,

    list,

    find,

    approve,

    reject,

    remove

};
