const {getAllTemperaments} = require("../controllers/temperamentControllers");

const getAllTemperamentsHandler = async (req,res) => {
    try {
        const allDogTemperaments = await getAllTemperaments();
        res.status(200).json(allDogTemperaments);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}

module.exports = {
    getAllTemperamentsHandler
}