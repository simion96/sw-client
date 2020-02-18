import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../util/utility';

const initialState = {
    roots: null,
    loading: false,
    error: 'lmoa',
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
        case actionTypes.FETCH_RESOURCE_FAILURE:
            return {...state, loading: false, error: action.payload };
        case actionTypes.FETCH_RESOURCE:
            return {
                ...state,
                loading: true
            };
        case actionTypes.FETCH_RESOURCE_SUCCESS:
            const favs = JSON.parse(localStorage.getItem('favourites') || '[]');
            const payload = action.payload.results.map(el => ({
                isFavourite: favs.includes(el.url),
                ...el,
                created: new Date(el.created).toISOString().substring(0, 10).toString(),
                edited: new Date(el.edited).toISOString().substring(0, 10).toString()
            }));
            return {
                ...state, 
                loading: false, 
                [action.resourceType]: [...state[action.resourceType]].concat(payload),
                [action.resourceType+'_headers']: getHeaders(action.payload.results)
            };
        case actionTypes.FETCH_RESOURCE_FAILURE:
            return {...state, loading: false, error: action.payload };
        case actionTypes.CLEAR_ERRORS:
            return {...state, loading: false, error: null}
        case actionTypes.SET_FAVOURITE_RESOURCE:
            const resIndex = state[action.payload.resourceType].findIndex(p => p.url === action.payload.url);
            const updatedState = JSON.parse(JSON.stringify(state));

            const newFavState = !updatedState[action.payload.resourceType][resIndex].isFavourite;
            updatedState[action.payload.resourceType][resIndex].isFavourite = newFavState;
            return updatedState;
        default:
            return state;
    }
};

export default reducer;