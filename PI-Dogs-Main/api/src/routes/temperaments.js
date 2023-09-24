const { Router } = require("express");
const router = Router();
const { getTemperaments} = require("../controllers/temperaments")

router.get('/temperaments' , getTemperaments)

module.exports = router