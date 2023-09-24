const regexName = /^(?!.*\d)[A-Za-z]{3,24}$/;
const regexImage = /^(?=.{1,}\.\w+$|.{1,}\:\/\/).+$/;
const RegexNumber = /^[0-9]+$/;
const regexLife = /^[0-9]+$/

const validation = (dogsData)=>{

    const errors = {}


    if(!regexName.test(dogsData.name)) errors.name = "Your name is invalid"

    if(!regexImage.test(dogsData.image)) errors.image = "Should be a pictur"
    
    if (!RegexNumber.test(dogsData.height1) || !RegexNumber.test(dogsData.height2))
    errors.height1 = "You can only put numbers";

    else if (!dogsData.height1 || !dogsData.height2)
    errors.height1 = "Debe llenar ambos campos";

    else if (Number(dogsData.height2) <= Number(dogsData.height1))
    errors.height1 = "The second value must be greater than the first";

  if (!RegexNumber.test(dogsData.weight1) || !RegexNumber.test(dogsData.weight2))
    errors.weight1 = "You can only put numbers";

  else if (!dogsData.weight1 || !dogsData.weight2)
    errors.weight1 = "You must fill in both fields";

  else if (Number(dogsData.weight1) >= Number(dogsData.weight2))
    errors.weight1 = "The second value must be greater than the first";

    if(!regexLife.test(dogsData.life_span)) errors.life_span = "must be a number"


    if(dogsData.temperament.length === 0) errors.temperament = "You must select at least 1 temperament"
    
    return errors
}

export default validation;