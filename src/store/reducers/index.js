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

const getHeaders = (results) => {
    return Object.keys(results[0]);
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
            return {
                ...state, 
                loading: false, 
                [action.resourceType]: [...state[action.resourceType]].concat(action.payload.results),
                [action.resourceType+'_headers']: getHeaders(action.payload.results) 
            };
        default:
            return state;
    }
};

export default reducer;