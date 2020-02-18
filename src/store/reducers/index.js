import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../util/utility';

const initialState = {
    roots: null,
    loading: false,
    error: null,
    people: [],
    planets: [],
    films: [],
    species: [],
    vehicles: [],
    starships: [],
    people_headers: [],
    planets_headers: [],
    films_headers: [],
    species_headers: [],
    vehicles_headers: [],
    starships_headers: []
}

//assumes all api responses have the same keys
const getHeaders = (results) => {
    return ['Favourite'].concat(Object.keys(results[0]));
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ROOTS:
            return {...state, loading: true};
        case actionTypes.FETCH_ROOTS_SUCCESS:
            return {...state, loading: false, roots: action.payload };
        case actionTypes.FETCH_RESOURCE:
            return {
                ...state,
                loading: true
            };
        case actionTypes.FETCH_RESOURCE_SUCCESS:
            let payload = action.payload.results.map(el => ({
                isFavourite: false,
                ...el
            }));
            return {
                ...state, 
                loading: false, 
                [action.resourceType]: [...state[action.resourceType]].concat(payload),
                [action.resourceType+'_headers']: getHeaders(action.payload.results)
            };
        case actionTypes.SET_FAVOURITE_RESOURCE:
            const prefix = 'https://swapi.co/api/';
            const resIndex = state[action.payload.resourceType].findIndex(p => p.url === action.payload.url);

            const copy = JSON.parse(JSON.stringify(state));
            console.log(copy);

            const newFavState = !copy[action.payload.resourceType][resIndex].isFavourite;
            console.log(newFavState);
            console.log(copy);

            copy[action.payload.resourceType][resIndex].isFavourite = newFavState;
            const updatedState = copy;

            console.log(updatedState);
            return updatedState;
            
        default:
            return state;
    }
};

export default reducer;