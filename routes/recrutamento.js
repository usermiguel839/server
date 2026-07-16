const express = require("express");

const router = express.Router();

const recrutamentoController = require("../controllers/recrutamentoController");
console.log(recrutamentoController);

/*==========================================
                POST
==========================================*/

router.post(

    "/",

    recrutamentoController.create

);

/*==========================================
            LISTAR TODOS
==========================================*/

router.get(

    "/",

    recrutamentoController.list

);

/*==========================================
        BUSCAR POR ID
==========================================*/

router.get(

    "/:id",

    recrutamentoController.find

);

/*==========================================
        APROVAR
==========================================*/

router.patch(

    "/:id/aprovar",

    recrutamentoController.approve

);

/*==========================================
        REPROVAR
==========================================*/

router.patch(

    "/:id/reprovar",

    recrutamentoController.reject

);

/*==========================================
        DELETAR
==========================================*/

router.delete(

    "/:id",

    recrutamentoController.remove

);

module.exports = router;
