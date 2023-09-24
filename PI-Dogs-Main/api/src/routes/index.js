const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

const dogs = require("./dogs.js")
const createDogs = require("./dogs.js")
const temperaments = require("./temperaments.js")

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/", dogs);
router.use("/", createDogs)
router.use("/", temperaments)


module.exports = router;