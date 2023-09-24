import {
  ADD_DOGS,
  NEXT,
  PREV,
  ON_SEARCH_ID,
  ON_SEARCH_NAME,
  ALL_TEMPERAMENTS,
  FILTER_TEMPERAMENTS,
  FILTER_AOZ,
  RESET,
  FILTER_WEIGHT,
  CREATE_DOG,
  FILTER_ORIGINS,
} from "./actionsTypes";

const initialState = {
  dogs: [],
  pageNumber: 1,
  onSearchById: [],
  temperaments: [],
  dogsFilter : [],
  dogsDb : [],
  dogsApi : []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DOGS:
      if (Array.isArray(action.payload)) {
        return {
          ...state,
          dogs: [...action.payload],
          dogsFilter: [...action.payload],
          dogsApi: [...action.payload]
        };
      }

    case ON_SEARCH_ID:
      return {
        ...state,
        onSearchById: action.payload,
      };

    case ON_SEARCH_NAME:
      return {
        ...state,
        dogs: action.payload,
        pageNumber: 1,
      };
    
    case CREATE_DOG:
      return{
        ...state,
        dogs: [action.payload, ...state.dogs],
        dogsFilter:  [action.payload, ...state.dogsFilter],
        dogsDb : [action.payload, ...state.dogsDb]
      }
    case ALL_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };

    case FILTER_ORIGINS:
      let updatedDogs = [];
      if (action.payload === "API") {
        updatedDogs = [...state.dogsApi];
      } else if (action.payload === "DB") {
        updatedDogs = [...state.dogsDb];
      } else {
        updatedDogs = [...state.dogsFilter, ...state.dogsDb];
      }
      return {
        ...state,
        dogs: updatedDogs,
        pageNumber: 1
      };    

      case FILTER_TEMPERAMENTS: 
      return {
        ...state,
        dogs: action.payload === "Alldogs" 
        ? [...state.dogsFilter]
        : state.dogsFilter.filter((dog) => dog.temperament && dog.temperament.includes(action.payload)),
        pageNumber: 1,
      };

    case FILTER_AOZ:
      const filterAoZ = [...state.dogs];
      return {
        ...state,
        dogs:
          action.payload === "A"
            ? filterAoZ.sort((a, b) => a.name.localeCompare(b.name))
            : filterAoZ.sort((a, b) => b.name.localeCompare(a.name)),
            pageNumber: 1,
      };

      case FILTER_WEIGHT:
        const filterWeight = [...state.dogs];
        return {
          ...state,
          dogs: action.payload === "maximum"
            ? filterWeight.sort((a, b) => Number(b.weight.split(" - ")[1]) - Number(a.weight.split(" - ")[1]))
            : filterWeight.sort((a, b) => Number(a.weight.split(" - ")[1]) - Number(b.weight.split(" - ")[1])),
            pageNumber: 1,
        };

      case RESET:
        return {
          ...state,
          dogs: [...state.dogsFilter]
        };

    case NEXT:
      return {
        ...state,
        pageNumber: state.pageNumber + 1,
      };

    case PREV:
      return {
        ...state,
        pageNumber: state.pageNumber - 1,
      };

    default:
      return state;
  }
};

export default reducer;