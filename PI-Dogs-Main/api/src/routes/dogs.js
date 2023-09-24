const { Router } = require("express");
const router = Router();
const { getDogsRace, getDogsRaceId, getDogsName} = require("../controllers/dogs")
const { postCreateDogs } = require("../controllers/createDogs")


router.get('/dogs' , getDogsRace)
router.get('/dogs/:id', getDogsRaceId)
router.get('/search', getDogsName)
router.post('/create', postCreateDogs )

module.exports = router