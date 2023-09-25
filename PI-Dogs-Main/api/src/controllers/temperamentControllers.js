const { Temperaments } = require("../db");
const axios = require("axios");
const { cleanTemperamentsArray, createDatabaseTemperaments } = require("../utils/utils");
const { API_KEY, ENDPOINT } = process.env;

// RUTA: Obtener todos los temperamentos de los perros

const myLink = `${ENDPOINT}?api_key=${API_KEY}`;
const getAllTemperaments = async () => {
    try {
        const databaseTemperaments = await Temperaments.findAll();

        if (databaseTemperaments.length === 0) {
            let idTemperament = 1;
            const apiDogsRaw = (await axios.get(myLink)).data;
            const apiTemperaments = cleanTemperamentsArray(apiDogsRaw);

            // Transformar los datos de la API antes de almacenarlos en la base de datos
            const apiTemperamentsArray = apiTemperaments.map(temperament => {
                return {
                    id: idTemperament++,
                    name: temperament
                };
            });

            // Almacenar los datos transformados en la base de datos
            let databaseTemperamentsCreated = await createDatabaseTemperaments(apiTemperamentsArray);

            if (databaseTemperamentsCreated === "Database Temperaments created") {
                return apiTemperamentsArray;
            } else {
                throw new Error("Error creating database temperaments");
            }
        }

        return databaseTemperaments;
    } catch (error) {
        console.error("Error in getAllTemperaments:", error.message);
        throw error;
    }
}

// Función para transformar los datos
const transformData = (data) => {
    data.forEach(item => {
        const temperamentsArray = item.Temperaments.map(temp => temp.name);
        item.temperament = temperamentsArray.join(', ');
        delete item.Temperaments;
    });
}

module.exports = {
    getAllTemperaments,
    transformData 
}

