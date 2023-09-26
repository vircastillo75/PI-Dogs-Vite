import {
    GET_ALL_TEMPERAMENTS,
     GET_ALL_BREEDS, 
     REMOVE_BREED, 
     FILTER_BY_TEMPERAMENTS, 
     FILTER_BY_ORIGIN, 
     ORDER_BY_WEIGHT, 
     ALPHABETICAL_ORDER, 
     SEARCH_BY_NAME} from "./action-types"
 
 const initialState = {
     allTemperaments: [],
     allBreeds: [],
     temperaments: [],
     breeds: [],
     temperament: {},
     breed: {}
 };
 
 const reducer = (state = initialState, action) => {
     switch (action.type) {
         case GET_ALL_TEMPERAMENTS:
             return{
                 ...state,
                 allTemperaments:action.payload,
                 temperaments: action.payload
             }
 
         case GET_ALL_BREEDS:
             return{
                 ...state,
                 allBreeds:action.payload,
                 breeds: action.payload
             }
 
         case SEARCH_BY_NAME:
             try {
                 if (action.payload==="") {
                     throw Error("Necesita escribir un nombre");
                 }
                 const breedsFiltered = state.allBreeds.filter((dog) => {
                     let nameArray = action.payload.toLowerCase().split(" ");
                     let breedArray = dog.name.toLowerCase().split(" ");
                     let verificacion = 0;
                     if(breedArray.length>=nameArray.length){
                         for(let i=0; i<nameArray.length; i++){
                             if(breedArray.indexOf(nameArray[i]) !== -1){
                                 verificacion+=1
                             }
                         }
                     }else{
                         return false;
                     }
                     
                     if(nameArray.length===verificacion){
                         return dog
                     }else{
                         return false
                     }
                 })
                 if (breedsFiltered.length===0) {
                     throw Error("No se encontro ninguna raza con ese nombre");
                 } else {
                     return{
                         ...state,
                         breeds: breedsFiltered
                     }
                 }
             } catch (error) {
                 alert(error.message)
             }
 
         case REMOVE_BREED:
             return{
                 ...state,
                 breeds: state.breeds.filter(dog=>dog.id!==action.payload)
             }
 
         case FILTER_BY_TEMPERAMENTS:
             try {
                 if (action.payload==="") {
                     throw Error("opcion invalida");
                 } else {
                     const breedsFiltered= state.breeds.filter(dog=>dog.Temperaments.indexOf(action.payload) !== -1)
                     console.log(breedsFiltered);
                     return{
                         ...state,
                         breeds: breedsFiltered
                     }
                 }
             } catch (error) {
                 return{...state}
             }
 
         case FILTER_BY_ORIGIN:
             try {
                 if (action.payload==="") {
                     throw Error("opcion invalida")
                 } else {
                     return{
                         ...state,
                         breeds: (action.payload.slice(0,1) === "a" 
                                 ?(action.payload.slice(1) === "ll"
                                     ?state.allBreeds
                                     :state.allBreeds.filter(dog=>typeof(dog.id)==="number"))
                                 :state.allBreeds.filter(dog=>isNaN(dog.id))
                                 )
                     }
                 }
             } catch (error) {
                 return{...state}
             }
 
         case ORDER_BY_WEIGHT:
             try {
                 if (action.payload==="") {
                     throw Error("opcion no valida")
                 } else {
                     return{
                         ...state,
                         breeds: 
                         (action.payload.slice(0,-1) === "PMIN"
                         ? (action.payload.slice(-1)==="A"
                             ? state.breeds.sort((a,b)=>{
                                 const breedMinWeightA = Number(a.minWeight);
                                 const breedMinWeightB = Number(b.minWeight);
                                 return breedMinWeightA-breedMinWeightB
                             })
                             :state.breeds.sort((a,b)=>{
                                 const breedMinWeightA = Number(a.minWeight);
                                 const breedMinWeightB = Number(b.minWeight);
                                 return breedMinWeightB-breedMinWeightA
                             }))
                         : (action.payload.slice(-1)==="A"
                             ? state.breeds.sort((a,b)=>{
                                 const breedMaxWeightA = Number(a.maxWeight);
                                 const breedMaxWeightB = Number(b.maxWeight);
                                 return breedMaxWeightA-breedMaxWeightB
                             })
                             :state.breeds.sort((a,b)=>{
                                 const breedMaxWeightA = Number(a.maxWeight);
                                 const breedMaxWeightB = Number(b.maxWeight);
                                 return breedMaxWeightB-breedMaxWeightA
                             }))
                         )
                     }
                 }
             } catch (error) {
                 return{...state}
             }
 
         case ALPHABETICAL_ORDER:
             try {
                 if (action.payload==="") {
                     throw Error("No es una opcion valida")
                 } else {
                     return{
                         ...state,
                         breeds: 
                             action.payload === "AA"
                             ?state.breeds.sort((a,b)=>{
                                 const breedNameA = a.name.toLowerCase();
                                 const breedNameB = b.name.toLowerCase();
                                 if(breedNameA < breedNameB){
                                     return -1;
                                 }
                                 if (breedNameA > breedNameB) {
                                     return 1;
                                 }
                                 return 0;
                             })
                             :state.breeds.sort((a,b)=>{
                                 const breedNameA = a.name.toLowerCase();
                                 const breedNameB = b.name.toLowerCase();
                                 if(breedNameB < breedNameA){
                                     return -1;
                                 }
                                 if (breedNameB > breedNameA) {
                                     return 1;
                                 }
                                 return 0;
                             })
                     }
                 }
             } catch (error) {
                 return{...state}
             }
         default:
             return{...state}
     }
 }
 
 export default reducer;