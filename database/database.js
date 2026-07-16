const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

let db = null;

function connect() {

    if (db) return db;

    const databasePath = path.resolve(process.env.DATABASE);

    fs.mkdirSync(path.dirname(databasePath), { recursive: true });

    db = new Database(databasePath);

    db.pragma("journal_mode = WAL");

    createTables();

    return db;

}

function createTables() {

    db.prepare(`
        CREATE TABLE IF NOT EXISTS recrutamentos (

            id TEXT PRIMARY KEY,

            nickname TEXT,

            discord TEXT,

            idade INTEGER,

            plataforma TEXT,

            tempoOnline INTEGER,

            motivo TEXT,

            status TEXT,

            messageId TEXT,

            channelId TEXT,

            staffId TEXT,

            staffName TEXT,

            createdAt TEXT,

            updatedAt TEXT

        )
    `).run();

}

function getDatabase() {

    if (!db) {

        connect();

    }

    return db;

}

module.exports = {

    connect,

    getDatabase

};
