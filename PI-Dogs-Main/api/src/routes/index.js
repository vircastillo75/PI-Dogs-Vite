const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const dog = require('./dogRoute');
const temperaments = require('./temperaments');


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/',dog);
router.use('/',temperaments);

module.exports = router;