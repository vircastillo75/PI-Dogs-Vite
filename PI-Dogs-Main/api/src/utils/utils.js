const { Temperaments } = require('../db');

const cleanDogArray = (arr) => arr.map((dog) => ({
    id: dog.id,
    name: dog.name,
    image: dog.image.url,
    minHeight: dog.height.metric?.split('-').map(element => element.trim())[0] || '6',
    maxHeight: dog.height.metric?.split('-').map(element => element.trim())[1] || '8',
    minWeight: dog.weight.metric?.split('-').map(element => element.trim())[0] || (dog.id === 179 ? '20' : '6'),
    maxWeight: dog.weight.metric?.split('-').map(element => element.trim())[1] || (dog.id === 179 ? '30' : '8'),
    life_span: dog.life_span,
    Temperaments: dog.temperament ? dog.temperament.split(', ').filter((temperament) => temperament !== '') : [],
    created: false,
}));

const cleanDogArrayBDD = (arr) => arr.map((dog) => ({
    id: dog.id,
    name: dog.name,
    image: dog.image,
    minHeight: dog.minHeight,
    maxHeight: dog.maxHeight,
    minWeight: dog.minWeight,
    maxWeight: dog.maxWeight,
    life_span: dog.life_span,
    Temperaments: (dog.Temperaments || []).map((temperament) => temperament.name),
    created: dog.created,
}));

const cleanDog = async (arrayDog) => {
    const dog = arrayDog[0];

    // Obtener temperamentos desde la base de datos
    const temperametDog = dog.temperament.split(', ').filter((temperament) => temperament !== '');
    const temperamentArray = await Temperaments.findAll({
        where: {
            name: temperametDog,
        },
    });

    return {
        id: dog.id,
        name: dog.name,
        image: dog.image.url,
        minHeight: dog.height.metric?.split('-').map(element => element.trim())[0] || '6',
        maxHeight: dog.height.metric?.split('-').map(element => element.trim())[1] || '8',
        minWeight: dog.weight.metric?.split('-').map(element => element.trim())[0] || (dog.id === 179 ? '20' : '6'),
        maxWeight: dog.weight.metric?.split('-').map(element => element.trim())[1] || (dog.id === 179 ? '30' : '8'),
        life_span: dog.life_span,
        Temperaments: temperamentArray.map((temperament) => temperament.name),
        created: false,
    };
};

const createDatabaseTemperaments = async (array) => {
    try {
        const uniqueTemperaments = [...new Set(array.map((temperament) => temperament.name))];
        await Temperaments.bulkCreate(uniqueTemperaments.map((name) => ({ name })));
        return 'Database Temperaments created';
    } catch (error) {
        console.error('Error creating database temperaments:', error.message);
        throw error;
    }
};

const cleanTemperamentsArray = (array) => {
    const temperamentsArrayRaw = array.map((dog) => dog.temperament);
    const temperamentsArray = temperamentsArrayRaw.join(',').split(',').map((temperament) => temperament.trim()).filter((temperament) => temperament !== '');
    const uniqueTemperaments = [...new Set(temperamentsArray)].sort();
    return uniqueTemperaments;
};

module.exports = {
    cleanDogArray,
    cleanDog,
    createDatabaseTemperaments,
    cleanTemperamentsArray,
    cleanDogArrayBDD,
};
