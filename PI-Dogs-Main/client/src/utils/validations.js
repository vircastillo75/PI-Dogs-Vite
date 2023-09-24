const validate = (breedData) => {

    let errors = {};

    const regexName = /\d+/;
    //const regex = /^[0-9\s!"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~]+$/
    //Errors name
    if (breedData.name.length<5) {
        errors.name = "Tiene que ser de minimo 5 caracteres"
    }
    if (breedData.name.length>30) {
        errors.name = "Tiene que ser de maximo 30 caracteres"
    }
    if (regexName.test(breedData.name)) {
        errors.name = "No puede tener numeros"
    }
    //Errors image
    if (breedData.image.length===0){
        errors.image = "El campo no puede estar vacio"
    }
    //Errors minHeight
    if (breedData.minHeight===0) {
        errors.minHeight = "No puede ser 0"
    }
    if (breedData.minHeight<0) {
        errors.minHeight = "No puede ser menor que 0"
    }
    if (breedData.minHeight>110) {
        errors.minHeight = "No puede ser mayor que 110 cm"
    }
    if (Number(breedData.minHeight)>Number(breedData.maxHeight)) {
        errors.minHeight = "No puede ser mayor que maxHeight"
    }
    //Errors maxHeight
    if (breedData.maxHeight===0) {
        errors.maxHeight = "No puede ser 0"
    }
    if (breedData.maxHeight<0) {
        errors.maxHeight = "No puede ser menor que 0"
    }
    if (breedData.maxHeight>110) {
        errors.maxHeight = "No puede ser mayor que 110 cm"
    }
    if (Number(breedData.maxHeight)<Number(breedData.minHeight)) {
        errors.maxHeight = "No puede ser menor que minHeight"
    }
    //Errors minWeight
    if (breedData.minWeight===0) {
        errors.minWeight = "No puede ser 0"
    }
    if (breedData.minWeight<0) {
        errors.minWeight = "No puede ser menor que 0"
    }
    if (breedData.minWeight>120) {
        errors.minWeight = "No puede ser mayor que 120 kg"
    }
    if (Number(breedData.minWeight)>Number(breedData.maxWeight)) {
        errors.minWeight = "No puede ser mayor que maxWeight"
    }
    //Errors maxWeight
    if (breedData.maxWeight===0) {
        errors.maxWeight = "No puede ser 0"
    }
    if (breedData.maxWeight<0) {
        errors.maxWeight = "No puede ser menor que 0"
    }
    if (breedData.maxWeight>120) {
        errors.maxWeight = "No puede ser mayor que 120 kg"
    }
    if (Number(breedData.maxWeight)<Number(breedData.minWeight)) {
        errors.maxWeight = "No puede ser menor que minWeight"
    }
    //Errors life_span
    if (breedData.life_span===0) {
        errors.life_span = "No puede ser 0"
    }
    if (breedData.life_span<0) {
        errors.life_span = "No puede ser menor que 0"
    }
    if (breedData.life_span>35) {
        errors.life_span = "No puede ser mayor que 35 años"
    }
    //Errors temperaments
    if (breedData.temperaments.length<3) {
        errors.temperaments= "minimo se requiere de 3 temperamentos"
    }
    if (breedData.temperaments.length>10) {
        errors.temperaments= "maximo puede tener 10 temperamentos"
    }

    return errors;
}

export default validate;