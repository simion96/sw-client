import { takeEvery, put, call } from "redux-saga/effects";
import {getRoots, getRoot} from '../../api';
//import * as actionTypes from "../actions/actionTypes";
import * as actions from "../actions/swapi";

export function* fetchRootsSaga(action) {
    const url = 'https://swapi.co/api/';
    try {
        const response = yield call(getRoots, action.resourceType);
        yield put(actions.getRootsSuccess(response));
    } catch (e) {
        yield console.log("got error");
        yield put(actions.getRootsFail('encountered an error'));
    }
}


export function* fetchResourceSaga(action) {
    try {
        let response = yield call(getRoot, action.resourceType);
        yield put(actions.getResourceSuccess(action.resourceType, response));

        //fetch all next pages if available
        if (response.next !== null) {
            let index = 2;
            while (response.next !== null) {
                const nextLinkSuffix = `/?page=${index++}`;
                response = yield call(getRoot, action.resourceType+nextLinkSuffix);
                yield put(actions.getResourceSuccess(action.resourceType, response));
            }
        }
    } catch(e) {
        yield console.log("got error");
        yield console.log(e);
        yield put(actions.getResourceFail(e));
    }
}
