import {
  SEARCH_SKILLS_FAILURE,
  SEARCH_SKILLS_REQUEST,
  SEARCH_SKILLS_SUCCESS,
  CHANGE_SEARCH_FIELD,
} from '../actions/actionTypes'

export interface ISkills {
  id: number,
  name: string,
}

export interface SkillsState {
  items: ISkills[],
  loading: boolean,
  error: null | string,
  search: string,
}

const initialState = { items: [], loading: false, error: null, search: '' } as SkillsState

export default function skillsReducer(state = initialState, action) {
  switch (action.type) {
    // если запрос - то показываем загрузку loading...
    case SEARCH_SKILLS_REQUEST:
      return { ...state, loading: true, error: null };

    // если ошибка - возвращаем ошибку
    case SEARCH_SKILLS_FAILURE:
      return { ...state, loading: false, error: action.payload.error };

    // если успешный ответ - записываем массив скилов items в стейт
    case SEARCH_SKILLS_SUCCESS:
      return {
        ...state,
        items: state.search === '' ? state.items = [] : action.payload.items,
        loading: false,
        error: null
      };

    // если меняется инпут - записываем в стейт ввод search
    case CHANGE_SEARCH_FIELD:
      return { ...state, items: [], search: action.payload.search };

    default:
      return state;
  }
}
