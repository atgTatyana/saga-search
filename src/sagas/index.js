import { takeLatest, debounce, retry, put, spawn } from "redux-saga/effects"
import { searchSkills } from "../api"
import {
  searchSkillsRequest,
  searchSkillsSuccess,
  searchSkillsFailure
} from "../actions/actionCreators"

import {
  CHANGE_SEARCH_FIELD,
  SEARCH_SKILLS_REQUEST,
} from "../actions/actionTypes"

function filterChangeSearchAction({ type, payload }) {
  return type === CHANGE_SEARCH_FIELD && payload.search.trim() !== ""
}
function* handleChangeSearchSaga(action) {
  yield put(searchSkillsRequest(action.payload.search))
}

function* handleSearchSkillsSaga(action) {
  try {
    const retryCount = 3
    const retryDelay = 1 * 1000
    const data = yield retry(
      retryCount,
      retryDelay,
      searchSkills,
      action.payload.search
    )

    yield put(searchSkillsSuccess(data))
  } catch (e) {
    yield put(searchSkillsFailure(e.message))
  }
}

// сага отслеживает экшен CHANGE_SEARCH_FIELD - изменение поля инпут
function* watchChangeSearchSaga() {
  // filterChangeSearchAction - фильтрует только экшен CHANGE_SEARCH_FIELD
  // handleChangeSearchSaga - формирует новый экшен на отправку запроса
  yield debounce(300, filterChangeSearchAction, handleChangeSearchSaga)
}

function* watchSearchSkillsSaga() {
  yield takeLatest(SEARCH_SKILLS_REQUEST, handleSearchSkillsSaga)
}

// корневая Saga запускается при инициализации приложения
export default function* saga() {
  yield spawn(watchChangeSearchSaga)
  yield spawn(watchSearchSkillsSaga)
}
