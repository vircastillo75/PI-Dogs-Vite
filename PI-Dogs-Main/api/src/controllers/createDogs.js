const { Dog , Temperaments } = require("../db")

const postCreateDogs = async function(req, res){
  try {
    const {id, name, image, weight, height, life_span, temperament } = req.body;

    const existingDog = await Dog.findOne({
      where: {
        name: name
      }
    });

    if (existingDog) {
      return res.status(404).json({ error: 'El perro ya existe en la base de datos.' });
    }

    const newDog = await Dog.create({id, name, image, weight, height, life_span, temperament });


    const allTemperaments = await Temperaments.findAll();


    const selectedTemperaments = allTemperaments.filter(temp => temperament.includes(temp.name));


    await newDog.addTemperaments(selectedTemperaments);

    const tempsDog = (await newDog.getTemperaments()).map(element => element.name).join(", ")


    res.status(200).json({...newDog.dataValues, temperament : tempsDog });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = {
    postCreateDogs
}