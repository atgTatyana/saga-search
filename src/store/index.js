import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import createSagaMiddleware from "redux-saga"
import skillsReducer from "../reducers/skillsReducer.ts"
import saga from "../sagas"
const reducer = combineReducers({ skills: skillsReducer })

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
// подключаем редьюсеры и sagaMiddleware
  reducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
)

//  запускаем сагу
sagaMiddleware.run(saga)

export default store
