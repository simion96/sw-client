import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../util/utility';

const initialState = {
    roots: null,
    people: null,
    loading: false,
    error: null
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ROOTS:
            return {...state, loading: true, roots: null, };
        case actionTypes.FETCH_ROOTS_SUCCESS:
            return {...state, loading: false, roots: action.payload}
        default:
            return state;
    }
};

export default reducer;