const { Router } = require("express");

const {
    getDogsHandler,
    getDogByIdHandler,
    createDogHandler
} = require("../handlers/dogHandlers")

const dogRouter = Router();

dogRouter.get("/",getDogsHandler);

dogRouter.get("/:id",getDogByIdHandler);

dogRouter.post("/",createDogHandler);


module.exports = dogRouter;