const axios = require('axios')
const {API_KEY, ENDPOINT}=process.env
const { Op} = require("sequelize")
const { Dog, Temperaments } = require("../db");



const getDogsRace = async function(req, res){
    try {
        const { data} = await axios.get(`${ENDPOINT}?api_key=${API_KEY}`)
        const dogsMap = []
        data.forEach((dogR) =>{
          const dogNews = {
            id : dogR.id,
            name : dogR.name,
            weight : dogR.weight.imperial,
            height : dogR.height.imperial,
            life_span : dogR.life_span,
            image : dogR.image.url,
            temperament: dogR.temperament,
        };
        dogsMap.push(dogNews)
        })
        res.status(200).json(dogsMap)
    } catch (error) {
        res.status(404
          ).end(error.message)
    }
}

const getDogsRaceId = async function(req, res){
      try {
    const { id } = req.params;

    const resultDogs = await axios.get(`${ENDPOINT}?api_key=${API_KEY}`)
    const allDogs = resultDogs.data;
    const dogsMap = []
    allDogs.forEach(dog => {
      const newDog = {
        id: dog.id,
        name: dog.name,
        weight: dog.weight.imperial,
        height: dog.height.imperial,
        life_span: dog.life_span,
        image: dog.image.url,
        temperament : dog.temperament,
      }
      dogsMap.push(newDog);
    });

    const dogsApi = dogsMap.find(dog => dog.id === Number(id));
    let resDb;

    if (!dogsApi) {
      const dogDb = await Dog.findByPk(id, {
        include: [{
          model: Temperaments,
          attributes: ['name'],
          through: {
            attributes: [],
          }
        }]
      });

      if (dogDb) {
        resDb = {
          id: dogDb.id,
          name: dogDb.name,
          weight: dogDb.weight,
          height: dogDb.height,
          life_span: dogDb.life_span,
          image: dogDb.image,
          temperament: dogDb.Temperaments.map((temp) => temp.name).join(', '),
        };
      }
    }

    res.status(200).json(dogsApi || resDb);
  } catch (error) {
    res.status(404).end(error.message);
  }
}

const getDogsName = async function(req, res){
  try {
    const { name } = req.query;

    const allDogs = await axios.get(`${ENDPOINT}?api_key=${API_KEY}`)
    const dogsApi = allDogs.data.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));

    const dbDogs = await Dog.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        }
      },
      include: Temperaments
    });

    const dogsMap = [];
    
    dogsApi.forEach((dogR) => {
      const dogNews = {
        id: dogR.id,
        name: dogR.name,
        weight: dogR.weight.imperial,
        height: dogR.height.imperial,
        life_span: dogR.life_span,
        temperament: dogR.temperament,
        image: dogR.image.url
      };
      dogsMap.push(dogNews);
    });

    dbDogs.forEach((dbDog) => {
      const dbDogData = {
        id: dbDog.id,
        name: dbDog.name,
        weight: dbDog.weight,
        height: dbDog.height,
        life_span: dbDog.life_span,
        temperament: dbDog.Temperaments.map((temp) => temp.name).join(', '),
        image: dbDog.image
      };
      dogsMap.push(dbDogData);
    });

    if (dogsMap.length > 0) {
      res.status(200).json(dogsMap);
    } else {
      res.status(404).json({ message: 'A dog breed with the specified name was not found.' });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}



module.exports = {
    getDogsRace,
    getDogsRaceId,
    getDogsName,
}