const { Router } = require("express");

const {getAllTemperamentsHandler} = require("../handlers/temperamentHandlers");

const temperamentRouter = Router();

temperamentRouter.get("/",getAllTemperamentsHandler);


module.exports = temperamentRouter;