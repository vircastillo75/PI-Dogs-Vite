import {
  ADD_DOGS,
  NEXT,
  PREV,
  ON_SEARCH_ID,
  ON_SEARCH_NAME,
  ALL_TEMPERAMENTS,
  FILTER_TEMPERAMENTS,
  FILTER_ORIGINS,
  FILTER_AOZ,
  RESET,
  FILTER_WEIGHT,
  CREATE_DOG,
} from "./actionsTypes";
const URL = "http://localhost:3001/dogs";
const URL_SEARCH = "http://localhost:3001/search?";
const URL_TEMPERAMENTS = "http://localhost:3001/temperaments";
const URL_CREATE = "http://localhost:3001/create";
import axios from "axios";

export const addDogs = () => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${URL}`);
      dispatch({
        type: ADD_DOGS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADD_DOGS_ERROR,
        payload: error.message, 
      });
    }
  };
};

export const onSearchId = (id) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${URL}/${id}`);
      dispatch({
        type: ON_SEARCH_ID,
        payload: data,
      });
    } catch (error) {
      alert(`Lo sentimos pero no tenemos ese perro`);
    }
  };
};

export const onSearchName = (name) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(`${URL_SEARCH}name=${name.trim()}`);
      dispatch({
        type: ON_SEARCH_NAME,
        payload: data,
      });
    } catch (error) {
      alert(`Sorry but we don't have any matches`);
    }
  };
};

export const allTemperaments = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL_TEMPERAMENTS}`);
      dispatch({
        type: ALL_TEMPERAMENTS,
        payload: data,
      });
    } catch (error) {
      alert(`${error.message}`);
    }
  };
};

export const createDog = (dog) => {
  return async function (dispatch) {
    try {
      const { data } = await axios.post(`${URL_CREATE}`, dog);
      return dispatch({
        type: CREATE_DOG,
        payload: data,
      });
    } catch (error) {
      alert(`Lo sentimos pero el perro, ya se encuentra en la base de datos`);
    }
  };
};

export const filterTemperaments = (temperaments) => {
  return {
    type: FILTER_TEMPERAMENTS,
    payload: temperaments,
  };
};

export const filterOrigins = (AoD)=>{
  return{
    type : FILTER_ORIGINS,
    payload : AoD,
  }
}

export const filterAz = (aOz) => {
  return {
    type: FILTER_AOZ,
    payload: aOz,
  };
};

export const filterWeight = (hOg) => {
  return {
    type: FILTER_WEIGHT,
    payload: hOg,
  };
};

export const next = () => {
  return {
    type: NEXT,
  };
};

export const prev = () => {
  return {
    type: PREV,
  };
};

export const reset = () => {
  return {
    type: RESET,
  };
};