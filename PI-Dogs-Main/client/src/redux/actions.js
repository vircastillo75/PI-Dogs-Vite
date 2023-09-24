import { 
  GET_ALL_TEMPERAMENTS, 
  GET_ALL_BREEDS, 
  REMOVE_BREED, 
  FILTER_BY_TEMPERAMENTS, 
  FILTER_BY_ORIGIN, 
  ORDER_BY_WEIGHT, 
  ALPHABETICAL_ORDER, 
  SEARCH_BY_NAME} from "./action-types";

export const getallBreeds = () => {
    return function(dispatch) {
        fetch("http://localhost:3001/dogs")
        .then(response => response.json())
        .then(data => dispatch({type: GET_ALL_BREEDS, payload: data}))
    }
}

export const getallTemperaments = () => {
    return function(dispatch) {
        fetch("http://localhost:3001/temperaments")
        .then(response => response.json())
        .then(data => dispatch({type: GET_ALL_TEMPERAMENTS, payload: data}))
    }
}

export const removeBreed = (idBreed) => {
    return{
        type: REMOVE_BREED,
        payload: idBreed
    }
}

export const filterByTemperaments = (temperament) => {
    return{
        type: FILTER_BY_TEMPERAMENTS,
        payload: temperament
    }
}

export const filterByOrigin = (origin) => {
    return{
        type: FILTER_BY_ORIGIN,
        payload: origin
    }
}

export const alphabeticalOrder = (order) => {
    return{
        type: ALPHABETICAL_ORDER,
        payload: order
    }
}

export const orderByWeight = (order) => {
    return{
        type: ORDER_BY_WEIGHT,
        payload: order
    }
}

export const searchByName = (name) => {
    return{
        type: SEARCH_BY_NAME,
        payload: name
    }
}