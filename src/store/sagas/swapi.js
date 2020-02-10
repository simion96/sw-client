import { takeEvery, put, call } from "redux-saga/effects";
import {getRoots, getRoot} from '../../api';
//import * as actionTypes from "../actions/actionTypes";
import * as actions from "../actions/swapi";

export function* fetchRootsSaga(action) {
    const url = 'https://swapi.co/api/';
    try {
        const response = yield call(getRoots);
        yield console.log(response);
        yield put(actions.getRootsSuccess(response));
    } catch (e) {
        yield console.log("got error");
        yield put(actions.getRootsFail('encountered an error'));
    }
}