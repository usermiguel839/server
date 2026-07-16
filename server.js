require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const recrutamentoRoutes = require("./routes/recrutamento");
const database = require("./database/database");

const app = express();

const PORT = process.env.PORT || 3000;

/*==========================================
                DATABASE
==========================================*/

database.connect();

/*==========================================
                MIDDLEWARE
==========================================*/

app.use(cors({

    origin: process.env.FRONTEND_URL,

    credentials: true

}));

app.use(express.json());

app.use(express.urlencoded({

    extended: true

}));


/*==========================================
                API
==========================================*/

app.use("/api/recrutamento", recrutamentoRoutes);

/*==========================================
            NOT FOUND
==========================================*/

app.use((req, res) => {

    res.status(404).json({

        success: false,

        message: "Rota não encontrada."

    });

});

/*==========================================
            ERROR HANDLER
==========================================*/

app.use((err, req, res, next) => {

    console.error(err);

    res.status(500).json({

        success: false,

        message: "Erro interno do servidor."

    });

});

/*==========================================
                START
==========================================*/

app.listen(PORT, () => {

    console.clear();

    console.log("");

    console.log("===================================");

    console.log(" Africa Asiatica - Backend");

    console.log("===================================");

    console.log("");

    console.log("Servidor iniciado!");

    console.log("");

    console.log("URL:");

    console.log("http://localhost:" + PORT);

    console.log("");

});
