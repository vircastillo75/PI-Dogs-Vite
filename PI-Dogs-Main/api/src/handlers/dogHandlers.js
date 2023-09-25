const { createDog, getDogById, getDogByName, getAllDogs } = require("../controllers/dogControllers");

const getDogsHandler = async (req, res) => {
    const { name } = req.query;

    try {
        if (name) {
            const results = await getDogByName(name);
            if (results.length === 0) {
                throw new Error("No se encontraron razas de perros con ese nombre");
            }
            res.status(200).json(results);
        } else {
            const results = await getAllDogs();
            if (results.length === 0) {
                throw new Error("No se encontraron razas de perros");
            }
            res.status(200).json(results);
        }
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const getDogByIdHandler = async (req, res) => {
    const { id } = req.params;
    const source = isNaN(id) ? "bdd" : "api";

    try {
        const dog = await getDogById(id, source);

        if (!dog) {
            throw new Error("No se encontró la raza del perro");
        }

        res.status(200).json(dog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const createDogHandler = async (req, res) => {
    try {
        const { name, image, minHeight, maxHeight, minWeight, maxWeight, life_span, temperaments } = req.body;

        if (!name || !image || !minHeight || !maxHeight || !minWeight || !maxWeight || !life_span || !temperaments) {
            throw new Error("No se pasaron los valores necesarios");
        }

        const newDog = await createDog(name, image, minHeight, maxHeight, minWeight, maxWeight, life_span, temperaments);

        if (!newDog) {
            throw new Error("No se pudo crear la raza de perro");
        }

        res.status(200).json(newDog);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

module.exports = {
    getDogsHandler,
    getDogByIdHandler,
    createDogHandler
};
