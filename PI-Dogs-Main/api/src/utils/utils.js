const {Temperament} = require("../db");

const cleanDogArray = (arr) => 
    arr.map( (dog) => {
        //filtrado de temperamentos
        const temperamentArray = dog.temperament? dog.temperament.split(", "):[];
        //filtrado de pesos
        const weightArray = dog.weight.metric?.split("-").map(element=>element.trim());
        weightArray.length===1? weightArray.push(weightArray[0]):weightArray;
        const minWeight = weightArray[0];
        const maxWeight = weightArray[1];
        const minWeightFiltered = minWeight==="NaN"&&dog.id===179?"20":"6";
        const maxWeightFiltered = dog.id===179?"30":"8"
        //filtrado de alturas
        const heightArray = dog.height.metric?.split("-").map(element=>element.trim());
        heightArray.length===1? heightArray.push(heightArray[0]):heightArray;
        const minHeight = heightArray[0];
        const maxHeight = heightArray[1];
        return{
            id: dog.id,
            name: dog.name,
            image: dog.image.url,
            minHeight: minHeight,
            maxHeight: maxHeight,
            minWeight: minWeight!=="NaN"?minWeight:minWeightFiltered,
            maxWeight: maxWeight!=="NaN"?maxWeight:maxWeightFiltered,
            life_span: dog.life_span,
            Temperaments: temperamentArray,
            created: false
        }
    })

const cleanDogArrayBDD = (arr) => 
    arr.map( dog => {
        const temperamentArray = dog.Temperaments?.map(temperament=> temperament.name);
        return{
            id: dog.id,
            name: dog.name,
            image: dog.image,
            minHeight: dog.minHeight,
            maxHeight: dog.maxHeight,
            minWeight: dog.minWeight,
            maxWeight: dog.maxWeight,
            life_span: dog.life_span,
            Temperaments: temperamentArray,
            created: dog.created
        }
    })



const cleanDog = async (arrayDog) => {
    const dog = arrayDog.find(dog=>arrayDog.indexOf(dog)===0);
    //filtrado de temperamentos
    const temperametDog = dog.temperament.split(", ");
    const temperamentArray = await Temperament.findAll({
        where: {
            name: temperametDog
        }
    })
    //filtrado de pesos
    const weightArray = dog.weight.metric?.split("-").map(element=>element.trim());
    weightArray.length===1? weightArray.push(weightArray[0]):weightArray;
    const minWeight = weightArray[0];
    const maxWeight = weightArray[1];
    const minWeightFiltered = minWeight==="NaN"&&dog.id===179?"20":"6";
    const maxWeightFiltered = dog.id===179?"30":"8"
    //filtrado de alturas
    const heightArray = dog.height.metric?.split("-").map(element=>element.trim());
    heightArray.length===1? heightArray.push(heightArray[0]):heightArray;
    const minHeight = heightArray[0];
    const maxHeight = heightArray[1];
    return {
        id: dog.id,
        name: dog.name,
        image: dog.image.url,
        minHeight: minHeight,
        maxHeight: maxHeight,
        minWeight: minWeight!=="NaN"?minWeight:minWeightFiltered,
        maxWeight: maxWeight!=="NaN"?maxWeight:maxWeightFiltered,
        life_span:dog.life_span,
        Temperaments:temperamentArray,
        created: false
    }
}

const createDatabaseTemperaments = async (array) => {
    array.forEach(async (temperament) => {
        await Temperament.create({
            name: temperament
        })
    });
    return("Database Temperaments created")
}

const cleanTemperamentsArray = (array) => {
    
    const temperamentsArrayRaw = array.map(dog => dog.temperament);
    const temperamentsArray = temperamentsArrayRaw.toString().split(",");
    const temperamentsTrim = temperamentsArray.map(temperament=>temperament.trim());
    const temperamentsNotNull = temperamentsTrim.filter(temperament=>temperament!=="");
    //Para que no se repitan los temperamentos de los perros
    const temperaments = temperamentsNotNull.filter(function(temperament, index, array) {
        return array.indexOf(temperament) === index;
    })
    const temperamentsOrdered = temperaments.sort();
    return temperamentsOrdered;
}

module.exports = {
    cleanDogArray,
    cleanDog,
    createDatabaseTemperaments,
    cleanTemperamentsArray, cleanDogArrayBDD
}