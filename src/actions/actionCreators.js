import {
  CHANGE_SEARCH_FIELD,
  SEARCH_SKILLS_SUCCESS,
  SEARCH_SKILLS_REQUEST,
  SEARCH_SKILLS_FAILURE,
} from './actionTypes'

export function searchSkillsRequest(search) {
  return { type: SEARCH_SKILLS_REQUEST, payload: { search } }
}

export function searchSkillsSuccess(items) {
  return { type: SEARCH_SKILLS_SUCCESS, payload: { items } }
}

export function searchSkillsFailure(error) {
  return { type: SEARCH_SKILLS_FAILURE, payload: { error } }
}

export function changeSearchField(search) {
  // тут payload - это то что вводим в инпут
  return { type: CHANGE_SEARCH_FIELD, payload: { search } }
}
