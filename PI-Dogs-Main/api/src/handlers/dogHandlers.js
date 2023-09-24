const { createDog, getDogById, getDogByName, getAllDogs } = require("../controllers/dogControllers");

//RUTA: Obtener todos los perros o solo los que coinciden con el nombre de la raza
const getDogsHandler = async (req,res) => {
    const {name} = req.query;

    const results = name
    ? await getDogByName(name)
    : await getAllDogs();

    try {
        if(results.length===0){
            throw Error("No se encontraron las razas de los perros");
        }
        else{
            res.status(200).json(results)
        }
    } catch (error) {
        res.status(404).json({error:error.message});
    }
};

//RUTA: Obtener el perro por el id de su raza
const getDogByIdHandler = async (req,res) => {
    const {id} = req.params;
    //Saber si el id es de la bdd o de la api
    const source = isNaN(id)? "bdd": "api";

    try {
        const dog = await getDogById(id,source);

        if (!dog) {
            throw Error("No se encontro la raza del perro");
        } else {
            return res.status(200).json(dog);
        }
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
};

//RUTA: Crear un perro
const createDogHandler = async (req,res) => {
    try {
        const {name, image, minHeight, maxHeight, minWeight, maxWeight, life_span, temperaments} = req.body;

        if (!name || !image || !minHeight || !maxHeight || !minWeight || !maxWeight || !life_span || !temperaments) {
            throw Error("No se pasaron los valores necesarios");
        }
        else{
            const newDog = await createDog(name, image, minHeight, maxHeight, minWeight, maxWeight, life_span, temperaments);

            if (!newDog) {
                throw Error("No se pudo crear la raza de perro");
            }
            else{
                return res.status(200).json(newDog);
            }
        }
    } catch (error) {
        return res.status(404).json({error: error.message});
    }
}

module.exports = {
    getDogsHandler,
    getDogByIdHandler,
    createDogHandler
}