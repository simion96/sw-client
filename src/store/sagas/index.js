import {all, fork} from 'redux-saga/effects';
import { takeEvery } from "redux-saga/effects";
import {
    fetchRootsSaga
} from './swapi';

import * as actionTypes from "../actions/actionTypes";

export default function* watchSwapi() {
    yield takeEvery(actionTypes.FETCH_ROOTS, fetchRootsSaga);
}
