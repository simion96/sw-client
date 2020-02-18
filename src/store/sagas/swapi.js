import { put, call } from "redux-saga/effects";
import {getRoots, getRoot} from '../../api';
import * as actions from "../actions/swapi";

export function* fetchRootsSaga(action) {
    try {
        const response = yield call(getRoots, action.resourceType);
        yield put(actions.getRootsSuccess(response));
    } catch (e) {
        yield put(actions.getRootsFail(e));
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
        yield put(actions.getResourceFail(e));
    }
}
