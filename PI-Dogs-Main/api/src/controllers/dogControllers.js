const { Dog, Temperaments } = require("../db");
const axios = require("axios");
const { cleanDogArray, cleanDog, cleanDogArrayBDD } = require("../utils/utils");
const { API_KEY, ENDPOINT } = process.env;

const myLink = `${ENDPOINT}?api_key=${API_KEY}`;

const createDog = async (name, image, minHeight, maxHeight, minWeight, maxWeight, life_span, temperaments) => {
    try {
        const newDog = await Dog.create({
            name,
            image,
            minHeight,
            maxHeight,
            minWeight,
            maxWeight,
            life_span,
        });

        const foundTemperaments = await Temperaments.findAll({
            where: { name: temperaments },
        });

        await newDog.addTemperaments(foundTemperaments);

        return newDog;
    } catch (error) {
        throw error;
    }
};

const getDogById = async (id, source) => {
    try {
        if (source === "api") {
            const apiDogsRaw = (await axios.get(myLink)).data;
            const apiDog = await cleanDog(apiDogsRaw.find((dog) => dog.id === Number(id)));
            return apiDog;
        } else {
            const databaseDog = await Dog.findByPk(id, {
                include: {
                    model: Temperaments,
                    through: {
                        attributes: [],
                    },
                },
            });
            return databaseDog;
        }
    } catch (error) {
        throw error;
    }
};

const getAllDogs = async () => {
    try {
        const [databaseDogsRaw, apiDogsRaw] = await Promise.all([
            Dog.findAll({
                include: {
                    model: Temperaments,
                    through: {
                        attributes: [],
                    },
                },
            }),
            axios.get(myLink).then((response) => response.data),
        ]);

        const databaseDogs = cleanDogArrayBDD(databaseDogsRaw);
        const apiDogs = cleanDogArray(apiDogsRaw);

        return [...databaseDogs, ...apiDogs];
    } catch (error) {
        throw error;
    }
};

const getDogByName = async (name) => {
    try {
        const dogNameBdd = name[0].toUpperCase() + name.substring(1);
        const [databaseDogs, apiDogsRaw] = await Promise.all([
            Dog.findAll({ where: { name: dogNameBdd } }),
            axios.get(myLink).then((response) => response.data),
        ]);

        const apiDogs = cleanDogArray(apiDogsRaw);
        const apiFiltered = apiDogs.filter((dog) => dog.name.toLowerCase() === name.toLowerCase());

        return [...databaseDogs, ...apiFiltered];
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createDog,
    getDogById,
    getAllDogs,
    getDogByName,
};
