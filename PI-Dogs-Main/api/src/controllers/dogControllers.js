const { Dog, Temperament } = require("../db");
const axios = require("axios");
const { cleanDogArray, cleanDog, cleanDogArrayBDD } = require("../utils/utils");
const {API_KEY} = process.env;

const myLink = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`

const createDog = async (name, image, minHeight, maxHeight, minWeight, maxWeight, life_span, temperaments) => {
    const newDog = await Dog.create({name,image,minHeight, maxHeight, minWeight, maxWeight,life_span});
    //Buscar por id de los temperamentos que ingresa el usuario
    temperaments.forEach(async (temperament) => {
        let temperaments = await Temperament.findOne({where:{name:temperament}});
        //Agregar el id del newDog y el id del temperamento a la tabla de detalle
        await newDog.addTemperament(temperaments);
    });
    return newDog;
}

const getDogById = async (id,source) => {
    if (source==="api") {
        //Trae la info del perro de la api
        const apiDogsRaw = (await axios.get(myLink)).data;
        const apiDogRaw = apiDogsRaw.filter(dog=>dog.id===Number(id));
        const apiDog = await cleanDog(apiDogRaw);
        return apiDog;
    } else {
        //Trae la info del perro de la bdd
        const databaseDog = await Dog.findByPk(id,{
            include:{
                model: Temperament,
                through:{
                    attributes:[]
                }
            }
        });
        return databaseDog;
    }
}

const getAllDogs = async () => {
    //Buscar en la BDD
    const databaseDogsRaw = await Dog.findAll({
        include:{
            model: Temperament,
            through:{
                attributes:[]
            }
        }
    });
    const databaseDogs = databaseDogsRaw.length>0?cleanDogArrayBDD(databaseDogsRaw):[]
    //Buscar en la API
    const apiDogsRaw = (await axios.get(myLink)).data;
    //Limpiar toda la data de la api para que sea similar a la BDD
    const apiDogs = cleanDogArray(apiDogsRaw);
    //Unificar los arrays
    return [...databaseDogs,...apiDogs]
}

const getDogByName = async (name) => {
    const dogNameBdd = name[0].toUpperCase() + name.substring(1);
    const databaseDogs = await Dog.findAll({where: {name:dogNameBdd}});

    const apiDogsRaw = (await axios.get(myLink)).data;

    const apiDogs = cleanDogArray(apiDogsRaw);
    //Filtrado de las razas de perros por nombre
    const apiFiltered = apiDogs.filter(dog => dog.name.toLowerCase() === name.toLowerCase());

    return [...databaseDogs, ...apiFiltered];
}


module.exports = {
    createDog,
    getDogById,
    getAllDogs,
    getDogByName
}