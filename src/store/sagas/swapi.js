import { takeEvery, put, call } from "redux-saga/effects";
import {getRoots, getRoot} from '../../api';
//import * as actionTypes from "../actions/actionTypes";
import * as actions from "../actions/swapi";

export function* fetchRootsSaga(action) {
    const url = 'https://swapi.co/api/';
    try {
        const response = yield call(getRoots, action.resourceType);
        //yield console.log(response);
        yield put(actions.getRootsSuccess(response));
    } catch (e) {
        yield console.log("got error");
        yield put(actions.getRootsFail('encountered an error'));
    }
}

export function* fetchResourceSaga(action) {
    try {
        const response = yield call(getRoot, action.resourceType);
        yield put(actions.getResourceSuccess(action.resourceType, response));
    } catch (e) {
        yield console.log("got error");
        yield console.log(e);
        yield put(actions.getResourceFail(e));
    }
}