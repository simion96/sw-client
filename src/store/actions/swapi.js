import * as actionTypes from "./actionTypes";

export const getRoots = () => {
    return {
        type: actionTypes.FETCH_ROOTS
    };
};

export const getRootsSuccess = (response) => {
    return {
        type: actionTypes.FETCH_ROOTS_SUCCESS,
        payload: response
    };
};

export const getRootsFail = error => {
    return {
        type: actionTypes.FETCH_ROOTS_FAILURE,
        payload: error
    };
};

export const getResource = (resourceType) => {
    return {
        type: actionTypes.FETCH_RESOURCE,
        resourceType: resourceType
    }
}

export const getResourceSuccess = (resourceType, response) => {
    return {
        type: actionTypes.FETCH_RESOURCE_SUCCESS,
        resourceType: resourceType,
        payload: response
    }
}

export const getResourceFail = error => {
    return {
        type: actionTypes.FETCH_RESOURCE_FAILURE,
        payload: error
    }
}

export const setFavouriteResource = (resourceType, url) => {
    (function() {
        let favs = JSON.parse(localStorage.getItem('favourites') || '[]');
        if (!favs.includes(url)) favs.push(url);
        localStorage.setItem('favourites', JSON.stringify(favs));
    })();
    return {
        type: actionTypes.SET_FAVOURITE_RESOURCE,
        payload: {
            resourceType: resourceType,
            url: url,
        }
    }
}