import { takeEvery } from "redux-saga/effects";
import {
    fetchRootsSaga,
    fetchResourceSaga
} from './swapi';

import * as actionTypes from "../actions/actionTypes";

export default function* watchSwapi() {
    yield takeEvery(actionTypes.FETCH_ROOTS, fetchRootsSaga);
    yield takeEvery(actionTypes.FETCH_RESOURCE, fetchResourceSaga);
}
